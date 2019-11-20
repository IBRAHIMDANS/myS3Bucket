import { UserController } from '../controller/UserController';
import { Router } from 'express';

const api = Router();

api.get('/', UserController.all);
api.get('/:id', UserController.one);
api.post('/', UserController.post);

export default api;
