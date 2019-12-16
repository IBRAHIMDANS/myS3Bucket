import { Router } from 'express';
import { BlobController } from '../controller/BlobController';
import passport from '../middlewares/passport';
import verifyToken from '../middlewares/verifyToken';
import multer from 'multer';

const api = Router();

api.post(
    '/',
    passport.authenticate('JwtStrategy', { session: false }),
    verifyToken,
    BlobController.post,
);

export default api;
