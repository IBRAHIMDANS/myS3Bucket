import { Router } from 'express';
import { BlobController } from '../controller/BlobController';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';
import multerMiddleware from '../middlewares/multer';

const api = Router();

api.post(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    multerMiddleware,
    BlobController.post,
);
api.post(
    '/duplicate/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BlobController.duplicate,
);
api.delete(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BlobController.delete,
);
api.get(
    '/:id',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BlobController.retrieve,
);

export default api;
