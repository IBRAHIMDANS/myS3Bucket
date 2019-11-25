import { UserController } from '../controller/UserController';
import { Router } from 'express';
import passport from '../middlewares/passport';

const api = Router();

api.get(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    UserController.all,
);
api.get(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    UserController.one,
);
api.post('/', UserController.post);
api.patch(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    UserController.update,
);
api.delete(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    UserController.deleteUser,
);

export default api;
