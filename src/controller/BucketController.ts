import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Bucket } from '../entity/Bucket';
import jwt from 'jsonwebtoken';
import { RequestCustom } from '../interfaces/Request';

export class BlockController {
    private static bucketRepository: Repository<Bucket>;

    //create

    //edit

    //delete
    // static deleteBucket
}
