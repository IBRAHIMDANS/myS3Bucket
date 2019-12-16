import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import config from '../config/config';

passport.use(
    'locale',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, next: Function) => {
            return await getRepository(User)
                .findOneOrFail({
                    select: ['uuid', 'nickname', 'email', 'password'],
                    where: { email },
                })
                .then((result: User) => {
                    if (!result.checkPassword(password)) {
                        return next('password is incorrect', undefined);
                    }
                    return next(undefined, result);
                })
                .catch(() => {
                    return next(`email not in bdd`, undefined);
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
            await getRepository(User)
                .findOneOrFail({
                    where: {
                        uuid: jwtPayload.uuid,
                        email: jwtPayload.email,
                    },
                })
                .then(result => {
                    return next(undefined, result);
                })
                .catch(() => {
                    return next("User  doesn't exist", undefined);
                });
        },
    ),
);
export default passport;
