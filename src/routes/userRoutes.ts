import { UserController } from '../controller/UserController';
import Express, { Router } from 'express';

const api = Router();
export const UserRoutes = [
    { method: 'get', route: '/users', controller: UserController, action: 'all', },
    { method: 'get', route: '/users/:id', controller: UserController, action: 'one', },
    { method: 'post', route: '/users', controller: UserController, action: 'save', },
    { method: 'delete', route: '/users/:id', controller: UserController, action: 'remove', },
];
api.get('/users',(req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'myS3',
    });
});
