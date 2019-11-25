import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import passport from '../middlewares/passport';
const api = Router();

api.post('/login', AuthController.login);

api.get('/changePassword', AuthController.login);

export default api;
