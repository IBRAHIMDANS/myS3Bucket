import { Router } from 'express';
import { BucketController } from '../controller/BucketController';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';

const api = Router();

api.post(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.post,
);
api.patch(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BucketController.update,
);

export default api;
