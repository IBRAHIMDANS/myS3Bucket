import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export class AuthController {
    private static userRepository: Repository<User>;

    constructor() {
        AuthController.userRepository = getRepository(User);
    }

    // Login
    static login = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        return passport.authenticate(
            'locale',
            { session: false },
            async (err: Error, user: User) => {
                if (err) {
                    return response.status(400).json({ error: err });
                }
                const { uuid, email, nickname } = await user;
                const token = jwt.sign(
                    { uuid, email, nickname },
                    config.jwtSecret,
                    { expiresIn: '1h' },
                );
                return response.json({ meta: token }).status(200);
            },
        )(request, response);
    };
}
