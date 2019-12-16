import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Blob } from '../entity/Blob';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Bucket } from '../entity/Bucket';
import multer, { StorageEngine } from 'multer';

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
        console.log(request.body)
        const blobRepository: Repository<Blob> = getRepository(Blob);
        const { name, path, size } = request.body;
        const blob = new Blob();
        await getRepository(Bucket)
            .findOneOrFail({ name: path })
            .then(result => {
                console.log(result);
                blob.name = name;
                blob.path = path;
                blob.size = size;
                blob.bucket = result;
            })
            .catch(error => {
                console.log(error);
            });
        const token = jwt.sign(
            {
                name,
                user: request.user,
            },
            config.jwtSecret,
        );
        return await blobRepository
            .save(blob)
            .then(() => {
                return response.status(200).json({ blob, meta: { token } });
            })
            .catch(err => {
                return response.status(500).json({ err });
            });
    };
}
