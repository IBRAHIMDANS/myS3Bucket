import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Bucket } from '../entity/Bucket';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { RequestCustom } from '../interfaces/Request';

export class BlockController {
    private static bucketRepository: Repository<Bucket>;

    //create

    //edit

    //delete
    static deleteBucket = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const bucketRepository: Repository<Bucket> = getRepository(Bucket);
        const bucket = await bucketRepository.findOne({ id: request.params.id });
        return await bucketRepository
            .remove(bucket as Bucket)
            .then((result: Bucket) => {
                return response.json(result).status(200);
            })
            .catch((err: Error) => {
                return response.status(500).json(err);
            });
    };

}