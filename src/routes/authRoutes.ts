import { UserController } from '../controller/UserController';
import { Router } from 'express';

const api = Router();

api.get('/login', UserController.all);
api.post('/change-password', UserController.one);

export default api;
