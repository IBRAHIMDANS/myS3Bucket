import Express, { Router } from 'express';
// import { UserRoutes } from './userRoutes';
import user from './userRoutes';
import auth from './authRoutes';
import bucket from './bucketRoutes';
import blob from './blobRoutes';
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
                    method: 'Post',
                    url: `${process.env.HOST}/api/auth/login`,
                    protected: 'No',
                },
                {
                    name: 'check user for change password',
                    method: 'Post',
                    url: `${process.env.HOST}/api/auth/checkPassword`,
                    protected: 'No',
                },
                {
                    name: 'change password',
                    method: 'Put',
                    url: `${process.env.HOST}/api/auth/changePassword/:id`,
                    protected: 'No',
                },
                {
                    name: 'reset password',
                    method: 'Put',
                    url: `${process.env.HOST}/api/users/resetPassword`,
                    protected: 'Yes',
                },
            ],
            Users: [
                {
                    name: 'Get All User',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Get User by Id',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Post User',
                    method: 'Post',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Update User by id',
                    method: 'Patch',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Delete User by id',
                    method: 'Delete',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Truncate user in bdd',
                    method: 'Delete',
                    warning: 'DEV only',
                    url: `${process.env.HOST}/api/users/truncate`,
                    protected: 'No',
                },
            ],
            Bucket: [
                {
                    name: 'Get All Bucket By User',
                    method: 'Get',
                    url: `${process.env.HOST}/api/bucket`,
                    protected: 'Yes',
                },
                {
                    name: 'Post Bucket',
                    method: 'Post',
                    url: `${process.env.HOST}/api/bucket`,
                    protected: 'Yes',
                },
                {
                    name: 'Update Bucket by id',
                    method: 'Patch',
                    url: `${process.env.HOST}/api/bucket/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Delete Bucket by id',
                    method: 'Delete',
                    url: `${process.env.HOST}/api/bucket/:id`,
                    protected: 'Yes',
                },
            ],
            Blob: [
                {
                    name: 'Get Blob or retrieve',
                    method: 'Post',
                    url: `${process.env.HOST}/api/blob/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Get Blob metaData',
                    method: 'Post',
                    url: `${process.env.HOST}/api/blob/:id/meta`,
                    protected: 'Yes',
                },
                {
                    name: 'Post Blob and ',
                    method: 'Post',
                    url: `${process.env.HOST}/api/blob?path=path`,
                    protected: 'Yes',
                },
                {
                    name: 'Delete Blob',
                    method: 'Delete',
                    url: `${process.env.HOST}/api/blob/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Duplicate Blob ',
                    method: 'Post',
                    url: `${process.env.HOST}/api/blob/duplicate/:id`,
                    protected: 'Yes',
                },
            ],
        },
    }).end();
});
api.use('/users', user);
api.use('/auth', auth);
api.use('/bucket', bucket);
api.use('/blob', blob);
api.get('/truncate', UserController.truncate);

export default api;
