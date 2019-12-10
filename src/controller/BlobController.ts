import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Blob } from '../entity/Blob';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import config from '../config/config';
import multer from 'multer';

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
        const blobRepository: Repository<Blob> = getRepository(Blob);
        const { name, path, size } = request.body;
        const blob = new Blob();
        blob.name = name;
        blob.path = path;
        blob.size = size;
        const token = jwt.sign(
            {
                name,
                user: blob.bucket.user,
            },
            config.jwtSecret,
        );
        return await blobRepository.save(blob).then(() => {
            return response.status(200).json({ blob, meta: { token } });
        });
    };
}