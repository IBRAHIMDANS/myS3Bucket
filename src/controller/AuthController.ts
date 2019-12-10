import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { sendMail } from '../lib/Mailer';
import config from '../config/config';
import { toLower } from 'lodash';

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

    static checkPassword = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        let { email } = request.body;
        email = toLower(email);
        return await getRepository(User)
            .findOneOrFail({ email })
            .then(async (user: User) => {
                const token = jwt.sign(
                    { uuid: user.uuid, email: user.email },
                    config.jwtSecret,
                    { expiresIn: '1h' },
                );
                return await sendMail(
                    user,
                    'Modification de votre mot de passe',
                    `
<p>Hello ${user.nickname}, pour modifier votre mot de passe veuiller cliquer sur le lien </p>
<a type="button" href="http://localhost:4200/api/auth/changePassword/${token}">Click  </a>
 `,
                )
                    .then(() => {
                        return response
                            .json({ status: 'true', meta: { token } })
                            .status(200);
                    })
                    .catch((error: Error) => {
                        return response
                            .json({ message: 'email invalid  ', error })
                            .status(500);
                    });
            })
            .catch(() => {
                return response.status(404).json('email not in bdd');
            });
    };

    static ChangePassword = async (
        request: Request,
        response: Response,
    ): Promise<void> => {
        console.log(request.params.id);
    };
}
