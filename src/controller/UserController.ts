import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { sendMailForRegister } from './MailController';
import { RequestCustom } from '../interfaces/Request';

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
                return await sendMailForRegister(user)
                    .then(() => {
                        return response.json({ meta: token }).status(200);
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
        request: RequestCustom,
        response: Response,
    ): Promise<any> => {
        const userRepository: Repository<User> = getRepository(User);
        console.log(request.user);
        const { password, passwordConfirm } = request.body;
        if (password === passwordConfirm) {
            const user = new User();
            user.password = password;
            user.password = user.hashPassword();
            const uuid = request.user.uuid;
            await userRepository
                .createQueryBuilder()
                .update(User)
                .set({
                    password: user.password,
                })
                .where({
                    uuid,
                })
                .execute()
                .then(result => {
                    console.log(result);
                    // const token = jwt.sign(
                    //     { uuid: request.params.id, nickname : request.user.nickname, email: request.user.email },
                    //     config.jwtSecret,
                    //     { expiresIn: '1h' },
                    // );
                    return response.status(200).json(result);
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
        const { nickname, email } = request.body;
        return await userRepository
            .clear()
            .then(result => {
                return response.status(200).json(result);
            })
            .catch(err => {
                return response.status(500).json(err);
            });
    };
}
