import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Blob } from '../entity/Blob';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Bucket } from '../entity/Bucket';

export class BlobController {
    private static blobRepository: Repository<Blob>;
    constructor() {
        BlobController.blobRepository = getRepository(Blob);
    }

    // Get Post Blob
    static post = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        console.log('request', request.file);
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
                return response.json('bucket not found');
            });
    };
}
