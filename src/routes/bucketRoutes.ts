import { Router } from 'express';
import { BucketController } from '../controller/BucketController';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';

const api = Router();

api.get(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.all,
);
api.get(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.one,
);
api.post(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.post,
);
api.head(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.head,
);
api.put(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.update,
);
api.delete(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.delete,
);

export default api;
