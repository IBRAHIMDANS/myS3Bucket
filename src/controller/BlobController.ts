import { getRepository, Like, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Blob } from '../entity/Blob';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Bucket } from '../entity/Bucket';
import * as fs from 'fs';
import { removeBlobAction } from '../lib/FileSystem';
import { RequestCustom } from '../interfaces/Request';
import * as path from 'path';

export class BlobController {
    private static blobRepository: Repository<Blob>;

    constructor() {
        BlobController.blobRepository = getRepository(Blob);
    }

    // Retrieve Blob
    static retrieve = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const blobRepository: Repository<Blob> = getRepository(Blob);
        return await blobRepository
            .findOneOrFail({
                where: { id: request.params.id },
            })
            .then(async blob => {
                console.log(blob);
                const token = jwt.sign(
                    {
                        blob,
                        user: request.user,
                    },
                    config.jwtSecret,
                );
                return response.status(200).json({meta: {token}});
            })
            .catch((err: Error) => {
                return response.status(404).json(err);
            });
    };
    // Post Blob
    static post = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const blobRepository: Repository<Blob> = getRepository(Blob);
        const { filename, path, size } = request.file;
        return await getRepository(Bucket)
            .findOneOrFail({ where: { name: request.query.path } })
            .then(async result => {
                const blob = new Blob();
                blob.name = filename;
                blob.path = path;
                blob.size = String(size);
                blob.bucket = result;
                const token = jwt.sign(
                    {
                        name: blob.name,
                        user: request.user,
                    },
                    config.jwtSecret,
                );
                return await blobRepository
                    .save(blob)
                    .then(() => {
                        return response
                            .status(200)
                            .json({ blob, meta: { token } });
                    })
                    .catch(err => {
                        return response.status(500).json({ err });
                    });
            })
            .catch(() => {
                return response.json('bucket not found').status(500);
            });
    };
    // Delete Blob
    static delete = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const blobRepository: Repository<Blob> = getRepository(Blob);
        return await blobRepository
            .findOneOrFail({
                where: { id: request.params.id },
            })
            .then(async blob => {
                if (fs.existsSync(blob.path)) {
                    return await blobRepository
                        .remove(blob)
                        .then(() => {
                            return removeBlobAction(
                                (request as RequestCustom).user.uuid,
                                blob.path as string,
                            )
                                .then(() => {
                                    return response
                                        .status(200)
                                        .json('blob deleted');
                                })
                                .catch(() => {
                                    return response
                                        .status(500)
                                        .json('cannot delete blob');
                                });
                        })
                        .catch(error => {
                            return response.status(500).json(error);
                        });
                } else {
                    return response.status(500).json('blob not found ');
                }
            })
            .catch((err: Error) => {
                return response.status(500).json(err);
            });
    };
    // Duplicate Blob
    static duplicate = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const blobRepository: Repository<Blob> = getRepository(Blob);
        const { id } = request.params;
        const blob = new Blob();
        return await blobRepository
            .findOneOrFail(id)
            .then(async (result: Blob) => {
                const ext = path.extname(result.name);
                const filename = path.basename(result.name, ext);
                const dir = path.dirname(result.path);
                return await blobRepository
                    .count({ where: { path: Like(`%${filename}%`) } })
                    .then(async (nbcopy: number) => {
                        blob.path = `${dir}/${filename}.copy.${nbcopy}${ext}`;
                        blob.name = `${filename}.copy.${nbcopy}${ext}`;
                        blob.size = result.size;
                        blob.bucket = result.bucket;
                        return await blobRepository
                            .save(blob)
                            .then(blob => {
                                fs.createReadStream(result.path).pipe(
                                    fs.createWriteStream(
                                        `${dir}/${filename}.copy.${nbcopy}${ext}`,
                                    ),
                                );
                                const token = jwt.sign(
                                    {
                                        blob,
                                        user: request.user,
                                    },
                                    config.jwtSecret,
                                );
                                return response
                                    .json({ meta: { token } })
                                    .status(200);
                            })
                            .catch(err => {
                                return response.json(err).status(500);
                            });
                    })
                    .catch(err => {
                        return response.json(err).status(500);
                    });
            })
            .catch(() => {
                return response.json('duplicate impossible').status(500);
            });
    };
}
