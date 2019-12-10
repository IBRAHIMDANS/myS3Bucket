import Express, { Router } from 'express';
// import { UserRoutes } from './userRoutes';
import user from './userRoutes';
import auth from './authRoutes';
import bucket from './bucketRoutes';
import { UserController } from '../controller/UserController';

const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'myS3',
        author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
        apiRoute: {
            Auth: [
                {
                    name: 'login',
                    method: 'Get',
                    url: 'http://localhost:8080/api/auth/login',
                    protected: 'No',
                },
                {
                    name: 'check user for change password',
                    method: 'Post',
                    url: 'http://localhost:8080/api/auth/checkPassword',
                    protected: 'No',
                },
                {
                    name: 'change password',
                    method: 'Put',
                    url: 'http://localhost:8080/api/auth/changePassword/:id',
                    protected: 'No',
                },
                {
                    name: 'reset password',
                    method: 'Put',
                    url: 'http://localhost:8080/api/users/resetPassword',
                    protected: 'Yes',
                },
            ],
            Users: [
                {
                    name: 'Get All User',
                    method: 'Get',
                    url: 'http://localhost:8080/api/users',
                    protected: 'Yes',
                },
                {
                    name: 'Get User by Id',
                    method: 'Get',
                    url: 'http://localhost:8080/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Post User',
                    method: 'Post',
                    url: 'http://localhost:8080/api/users',
                    protected: 'Yes',
                },
                {
                    name: 'Update User by id',
                    method: 'Patch',
                    url: 'http://localhost:8080/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Delete User by id',
                    method: 'Delete',
                    url: 'http://localhost:8080/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Truncate user in bdd',
                    method: 'Delete',
                    warning: 'DEV only',
                    url: 'http://localhost:8080/api/users/truncate',
                    protected: 'No',
                },
            ],
            Bucket: [],
            Blob: [],
        },
    }).end();
});
api.use('/users', user);
api.use('/auth', auth);
api.use('/bucket', bucket);
api.get('/truncate', UserController.truncate);

export default api;
