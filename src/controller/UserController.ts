import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
    private static userRepository: Repository<User>;

    constructor() {
        UserController.userRepository = getRepository(User);
    }

    // Get ALL user
    static all = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const userRepository: Repository<User> = getRepository(User);
        await userRepository
            .find()
            .then(result => response.json(result).status(200))
            .catch(error => response.status(500).json(error));
    };
    // Get user by id
    static one = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const userRepository: Repository<User> = getRepository(User);
        await userRepository
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
    ): Promise<void> => {
        const userRepository: Repository<User> = getRepository(User);
        const { nickname, email, password } = request.body;
        console.log(request.body);
        await userRepository
            .save({
                nickname,
                email,
                password,
            })
            .then(result => response.json(result).status(200))
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
    ): Promise<void> => {
        const userRepository: Repository<User> = getRepository(User);
        const user = await userRepository.findOne({ uuid: request.params.id });
        await userRepository
            .remove(user as User)
            .then((result: any) => {
                return response.json(result).status(200);
            })
            .catch((err: any) => {
                return response.status(500).json(err);
            });
    };
    // Verifier afta
    // Get Update by id
    static update = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        const userRepository: Repository<User> = getRepository(User);
        const { nickname, email } = request.body;
        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                nickname,
                email,
            })
            .where({ uuid: request.params.id })
            .execute()
            .then(result => {
                console.log(result);
                return response.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                return response.status(500).json(err);
            });
    };
}
