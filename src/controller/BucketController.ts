import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Bucket } from '../entity/Bucket';
import jwt from 'jsonwebtoken';
import { sendMail } from './MailController';
import * as fs from 'fs';
import config from '../config/config';

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
    static post = async (request: Request, response: Response) => {};
    // verifier afta
    // Get Delete by user
    static deleteBucket = async (request: Request, response: Response) => {};
    // Verifier afta
    static update = async (request: Request, response: Response) => {};
    // Post reset password user
}
