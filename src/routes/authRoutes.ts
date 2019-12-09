import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import passport from '../middlewares/passport';

const api = Router();

api.post('/login', AuthController.login);

api.post('/checkPassword', AuthController.checkPassword);

api.put('/changePassword/:id', AuthController.ChangePassword);

export default api;
