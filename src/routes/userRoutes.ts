import { UserController } from '../controller/UserController';
import Express, { Router } from 'express';
import {User} from '../entity/User';
import {createConnection} from '../main';

const api = Router();

// export const UserRoutes = [
//     { method: 'get', route: '/users', controller: UserController, action: 'all', },
//     { method: 'get', route: '/users/:id', controller: UserController, action: 'one', },
//     { method: 'post', route: '/users', controller: UserController, action: 'save', },
//     { method: 'delete', route: '/users/:id', controller: UserController, action: 'remove', },
// ];
api.get('/', (req: Express.Request, res: Express.Response) => {
    createConnection().connection.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27,
    });
    res.json({
        'Route': 'User',
    }).end();
});

// export default UserRoutes;
export default api;
