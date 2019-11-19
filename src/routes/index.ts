import Express, {Router} from 'express';
// import { UserRoutes } from './userRoutes';
import user from './userRoutes';

const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'myS3',
        author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
    }).end();
});
api.use('/users',user);

export default api;
