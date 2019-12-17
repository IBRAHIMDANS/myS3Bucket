import { NextFunction, Request, Response } from 'express';

import multer from 'multer';
import { getRepository, Repository } from 'typeorm';
import { Bucket } from '../entity/Bucket';
import { RequestCustom } from '../interfaces/Request';

export default async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const user = (request as RequestCustom).user;
    const bucketRepository: Repository<Bucket> = getRepository(Bucket);
    const storage = multer.diskStorage({
        destination: async (
            req: RequestCustom,
            file: any,
            cb,
        ): Promise<void> => {
            console.log(req.body.name);
            console.log(user);
            bucketRepository
                .findOneOrFail({ where: { name: req.body.path, user } })
                .then(result => {
                    cb(
                        null,
                        `${process.env.MYS3Storage}/${user.uuid}/${result.name}`,
                    );
                })
                .catch((err: Error) => {
                    cb(err, `${err}`);
                });
        },
        filename: async (req: RequestCustom, file: any, cb): Promise<void> => {
            cb(null, file.originalname);
        },
    });
    const upload = multer({ storage }).single('file');
    upload(request, response, err => {
        if (err) next(err);
        next();
    });
};
