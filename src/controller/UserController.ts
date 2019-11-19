import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {

    static all = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository: Repository<User> = getRepository(User);
        await userRepository.find().then(result => {
            console.log(result);
            return response.json(result).status(200);
        }).catch(error => {
            return response.status(500).json(error);
        });

    };
    static one = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository: Repository<User> = getRepository(User);
        await userRepository.findOne(request.params.id).then(result => {
            return response.json(result).status(200);
        }).catch(error => {
            return response.status(500).json(error);
        });
    };
    static post = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository: Repository<User> = getRepository(User);
        console.log(request.body);
        const { nickname, email, password } = request.body;
        await userRepository.save({
            nickname,
            email,
            password
        }).then(result => {
            return response.json(result).status(200);
        }).catch(error => {
            console.log(error);
            return response.status(500).json({ 'error': request.statusCode, 'message': error.message });
        });
    };


    //     // async remove(request: Request, response: Response, next: NextFunction) {
    //     //     const userToRemove: any = await this.userRepository.findOne(
    //     //         request.params.id,
    //     //     );
    //     //     await this.userRepository.remove(userToRemove);
    //     // }

}
