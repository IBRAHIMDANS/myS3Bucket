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
                    method: 'Get',
                    url: `https://mys3-bucket.herokuapp.com/api/auth/login`,
                    protected: 'No',
                },
                {
                    name: 'check user for change password',
                    method: 'Post',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/auth/checkPassword',
                    protected: 'No',
                },
                {
                    name: 'change password',
                    method: 'Put',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/auth/changePassword/:id',
                    protected: 'No',
                },
                {
                    name: 'reset password',
                    method: 'Put',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/users/resetPassword',
                    protected: 'Yes',
                },
            ],
            Users: [
                {
                    name: 'Get All User',
                    method: 'Get',
                    url: 'https://mys3-bucket.herokuapp.com/api/users',
                    protected: 'Yes',
                },
                {
                    name: 'Get User by Id',
                    method: 'Get',
                    url: 'https://mys3-bucket.herokuapp.com/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Post User',
                    method: 'Post',
                    url: 'https://mys3-bucket.herokuapp.com/api/users',
                    protected: 'Yes',
                },
                {
                    name: 'Update User by id',
                    method: 'Patch',
                    url: 'https://mys3-bucket.herokuapp.com/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Delete User by id',
                    method: 'Delete',
                    url: 'https://mys3-bucket.herokuapp.com/api/users/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Truncate user in bdd',
                    method: 'Delete',
                    warning: 'DEV only',
                    url: 'https://mys3-bucket.herokuapp.com/api/users/truncate',
                    protected: 'No',
                },
            ],
            Bucket: [
                {
                    name: 'Get All Bucket By User',
                    method: 'Get',
                    url: 'https://mys3-bucket.herokuapp.com/api/bucket',
                    protected: 'Yes',
                },
                {
                    name: 'Post Bucket',
                    method: 'Post',
                    url: 'https://mys3-bucket.herokuapp.com/api/bucket',
                    protected: 'Yes',
                },
                {
                    name: 'Update Bucket by id',
                    method: 'Patch',
                    url: 'https://mys3-bucket.herokuapp.com/api/bucket/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Delete Bucket by id',
                    method: 'Delete',
                    url: 'https://mys3-bucket.herokuapp.com/api/bucket/${id}',
                    protected: 'Yes',
                },
            ],
            Blob: [
                {
                    name: 'Get Blob or retrieve',
                    method: 'Post',
                    url: 'https://mys3-bucket.herokuapp.com/api/blob/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Get Blob metaData',
                    method: 'Post',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/blob/${id}/meta',
                    protected: 'Yes',
                },
                {
                    name: 'Post Blob and ',
                    method: 'Post',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/blob?path=${path}',
                    protected: 'Yes',
                },
                {
                    name: 'Delete Blob',
                    method: 'Delete',
                    url: 'https://mys3-bucket.herokuapp.com/api/blob/${id}',
                    protected: 'Yes',
                },
                {
                    name: 'Duplicate Blob ',
                    method: 'Post',
                    url:
                        'https://mys3-bucket.herokuapp.com/api/blob/duplicate/${id}',
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
