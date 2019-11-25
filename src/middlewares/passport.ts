import config from '../config/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

passport.use(
    'locale',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, next: Function) => {
            return await getRepository(User)
                .findOne({
                    where: { email },
                })
                .then((result: User | undefined) => {
                    if (result !== undefined) {
                        // console.log('yes', result);
                        // if (!result.checkPassword(password)) {
                        //     return next('password is incorrect', undefined);
                        // }
                        return next(false, result);
                    } else {
                        return next(
                            'Email or password is incorrect',
                            undefined,
                        );
                    }
                })
                .catch((error: Error) => {
                    return next(error);
                });
        },
    ),
);

passport.use(
    'JwtStrategy',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtSecret,
        },
        async (jwtPayload, next: Function) => {
            try {
                await getRepository(User)
                    .findOne({
                        where: {
                            uuid: jwtPayload.uuid,
                            email: jwtPayload.email,
                        },
                    })
                    .then(result => {
                        return next(false, result);
                    })
                    .catch(() => {
                        return next('User  doesn\'t exist');
                    });
            } catch (error) {
                return next(error.message);
            }
        },
    ),
);
export default passport;
