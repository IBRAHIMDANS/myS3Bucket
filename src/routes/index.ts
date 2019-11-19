import Express, {Router} from 'express';
import { UserRoutes } from './userRoutes';
import { Request, Response } from 'express';

const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'myS3',
        author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
    });
});

export default api;
