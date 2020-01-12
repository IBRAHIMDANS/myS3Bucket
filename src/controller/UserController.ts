import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import { sendMail } from '../lib/Mailer';
import { RequestCustom } from '../interfaces/Request';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import config from '../config/config';
import {
    createDirectoryAction,
    removeDirectoryAction,
} from '../lib/FileSystem';
import { Bucket } from '../entity/Bucket';

export class UserController {
    private static userRepository: Repository<User>;

    constructor() {
        UserController.userRepository = getRepository(User);
    }

    // Get ALL user
    static all = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
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
        const userRepository: Repository<User> = getRepository(User);
        return await userRepository
            .findOne({
                where: { uuid: request.params.id },
                relations: ['buckets'],
            })
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
        const userRepository: Repository<User> = getRepository(User);
        const { nickname, email, password } = request.body;
        const user = new User();
        user.nickname = nickname;
        user.email = email;
        user.password = password;
        user.password = user.hashPassword();
        const token = jwt.sign(
            {
                nickname,
                email,
            },
            config.jwtSecret,
        );
        return await userRepository
            .save(user)
            .then(async () => {
                createDirectoryAction(`${user.uuid}`);
                const bucket = new Bucket();
                bucket.name = user.uuid;
                bucket.user = user;
                return await getRepository(Bucket)
                    .save(bucket)
                    .then(async () => {
                        return await sendMail(
                            user,
                            'Welcome',
                            `<p>Hello ${user.nickname} welcome to  myS3</p>`,
                        )
                            .then(() => {
                                return response
                                    .json({ meta: { token } })
                                    .status(200);
                            })
                            .catch((err: Error) => {
                                return response.json({ err }).status(500);
                            });
                    })
                    .catch(error => {
                        return response.status(500).json({
                            error: request.statusCode,
                            message: error.message,
                        });
                    });
            })
            .catch(error => {
                return response.status(500).json({
                    error: request.statusCode,
                    message: error.message,
                });
            });
    };
    // verifier afta
    // Get Delete by user
    static deleteUser = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        const user = await userRepository.findOne({ uuid: request.params.id });
        return await userRepository
            .remove(user as User)
            .then((result: User) => {
                removeDirectoryAction(`${request.params.id}`);
                return response.json(result).status(200);
            })
            .catch((err: Error) => {
                return response.status(500).json(err);
            });
    };
    // Verifier afta
    static update = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        const { nickname, email } = request.body;
        return await userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                nickname,
                email,
            })
            .where({ uuid: request.params.id })
            .execute()
            .then(result => {
                return response.status(200).json(result);
            })
            .catch(err => {
                return response.status(500).json(err);
            });
    };
    // Post reset password user
    static resetPassword = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        const { password, passwordConfirm } = request.body;
        if (password === passwordConfirm) {
            const userTemps = new User();
            userTemps.password = password;
            userTemps.password = userTemps.hashPassword();
            const { user } = request as RequestCustom;
            return await userRepository
                .createQueryBuilder()
                .update(User)
                .set({
                    password: userTemps.password,
                })
                .where({
                    uuid: user.uuid,
                })
                .execute()
                .then(() => {
                    const token = jwt.sign(
                        {
                            uuid: user.uuid,
                            nickname: user.nickname,
                            email: user.email,
                        },
                        config.jwtSecret,
                        { expiresIn: '1h' },
                    );
                    return response.status(200).json({ meta: { token } });
                })
                .catch((err: Error) => {
                    return response.status(500).json(err);
                });
        } else {
            return response
                .status(500)
                .json({ error: "password don't match with passwordConfirm" });
        }
    };

    // truncate user for dev
    static truncate = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const userRepository: Repository<User> = getRepository(User);
        return await userRepository
            .clear()
            .then(result => {
                if (fs.existsSync(`${process.env.MYS3Storage}`)) {
                    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
                        rimraf.sync(`${process.env.MYS3Storage}`);
                    }
                }
                return response.status(200).json(result);
            })
            .catch(err => {
                return response.status(500).json(err);
            });
    };
}
