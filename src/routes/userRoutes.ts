import { UserController } from '../controller/UserController';
import { Router } from 'express';

const api = Router();

api.get('/', UserController.all);
api.get('/:id', UserController.one);
api.post('/', UserController.post);
api.patch('/:id', UserController.update);
api.delete('/:id', UserController.deleteUser);

export default api;
