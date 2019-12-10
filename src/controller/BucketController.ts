import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Bucket } from '../entity/Bucket';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { createDirectoryAction } from '../lib/FileSystem';
import { RequestCustom } from '../interfaces/Request';

export class BucketController {
    private static BucketRepository: Repository<Bucket>;

    constructor() {
        BucketController.BucketRepository = getRepository(Bucket);
    }

    // Get ALL bucket by user
    static all = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<Bucket> = getRepository(Bucket);
        return await userRepository
            .find()
            .then(result => response.json(result).status(200))
            .catch(error => response.status(500).json(error));
    };
    // Get Post bucket
    static post = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const bucketRepository: Repository<Bucket> = getRepository(Bucket);
        const { name } = request.body;
        const bucket = new Bucket();
        bucket.name = name;
        bucket.user = (request as RequestCustom).user;
        createDirectoryAction(
            `${(request as RequestCustom).user.uuid}/${bucket.name}`,
        );
        const token = jwt.sign(
            {
                name,
                user: bucket.user,
            },
            config.jwtSecret,
        );
        return await bucketRepository
            .save(bucket)
            .then(() => {
                return response.status(200).json({ bucket, meta: { token } });
            })
            .catch(err => {
                return response.status(500).json({ err });
            });
    };
    // verifier afta
    // Get Delete by user
    // Verifier afta
    static update = async (request: Request, response: Response) => {
        return null;
    };
    // Post reset password user
}
