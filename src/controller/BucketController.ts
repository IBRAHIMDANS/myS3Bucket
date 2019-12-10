import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Bucket } from '../entity/Bucket';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../entity/User';

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
    // Get user by id
    static one = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<Bucket> = getRepository(Bucket);
        return await userRepository
            .findOne(request.params.id)
            .then(result => {
                return response.json(result).status(200);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    };
    // Get Post user
    static post = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        console.log(request)
        const bucketRepository: Repository<Bucket> = getRepository(Bucket);
        const { name } = request.body;
        const bucket = new Bucket();
        bucket.name = name;
        await getRepository(User)
            .findOne('4928b140-5319-4fb0-89f2-6538fa570585')
            .then(user => {
                bucket.user = user;
            });
        const token = jwt.sign(
            {
                name,
                user: bucket.user,
            },
            config.jwtSecret,
        );
        return await bucketRepository.save(bucket).then(() => {
            return response.status(200).json({ bucket, meta: { token } });
        });
    };
    // verifier afta
    // Get Delete by user
    static deleteBucket = async (request: Request, response: Response) => {};
    // Verifier afta
    static update = async (request: Request, response: Response) => {};
    // Post reset password user
}
