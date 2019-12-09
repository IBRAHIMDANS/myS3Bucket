import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { sendMail } from './MailController';

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
                    process.env.jwtSecret as string,
                    { expiresIn: '1h' },
                );
                return response.json({ meta: token }).status(200);
            },
        )(request, response);
    };

    static checkPassword = async (
        request: Request,
        response: Response,
    ): Promise<null> => {
        const { email } = request.body;
        await getRepository(User)
            .findOneOrFail({ email })
            .then(async (user: User) => {
                await sendMail(
                    user,
                    'Modification de votre mot de passe',
                    `<p>Hello ${user.nickname}, pour modifier votre mot de passe veuiller cliquer sur le lien </p> `,
                )
                    .then(result => {
                        console.log(result);
                    })
                    .catch((error: Error) => {
                        console.log(error);
                    });
            })
            .catch((error: Error) => {
                console.log(error);
                return response.status(404).json('email not in bdd');
            });
        return null;
    };
}
