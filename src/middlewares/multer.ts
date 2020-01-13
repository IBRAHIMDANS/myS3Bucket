import { NextFunction, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';

import { getRepository, Repository } from 'typeorm';
import { Bucket } from '../entity/Bucket';
import { RequestCustom } from '../interfaces/Request';

export default async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const user = (request as RequestCustom).user;
    const bucketRepository: Repository<Bucket> = getRepository(Bucket);
    const storage: StorageEngine = multer.diskStorage({
        destination: async (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            req: any,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void,
        ): Promise<void> => {
            if (!req.query.path) {
                await bucketRepository
                    .findOneOrFail({ where: { name: req.user.uuid } })
                    .then(result => {
                        cb(null, `${process.env.MYS3Storage}/${result.name}`);
                    })
                    .catch((err: Error) => {
                        cb(err, `${err}`);
                    });
            } else {
                console.log()
                await bucketRepository
                    .findOneOrFail({
                        where: {
                            name: req.query.path.split('/').pop(),
                        },
                    })
                    .then(() => {
                        cb(
                            null,
                            `${process.env.MYS3Storage}/${user.uuid}/${req.query.path}`,
                        );
                    })
                    .catch((err: Error) => {
                        cb(err, `${err}`);
                    });
            }
        },
        filename: async (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void,
        ): Promise<void> => {
            cb(null, file.originalname);
        },
    });
    const upload = multer({ storage }).single('file');
    upload(request, response, err => {
        if (err) next(err);
        next();
    });
};
