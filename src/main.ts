import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import route from './routes';
import cors from 'cors';
import cacheControl from 'express-cache-controller';
import * as http from 'http';
import passport from 'passport';
import * as fs from 'fs';
import helmet from 'helmet';
import { hostname } from 'os';

config(); // add dotEnv

const app: Express.Express = Express();
export let server: http.Server;
export const port = process.env.PORT || 8082;

const MYS3DATADIR = `${process.env.MYS3Storage}`;

if (!fs.existsSync(MYS3DATADIR)) {
    fs.mkdirSync(MYS3DATADIR);
}
createConnection('default')
    .then(async () => {
        app.use(bodyParser.json());
        app.use(helmet());
        app.use(cors());
        app.use(passport.initialize());
        app.use(cacheControl({ noCache: true }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/', (req: Express.Request, res: Express.Response) =>
            res
                .status(200)
                .end(` go to url route https://mys3-bucket.herokuapp.com/api`),
        );
        app.use('/api', route);
        server = app.listen(port, () => {
            console.log(
                `server started at https://mys3-bucket.herokuapp.com/api`,
            );
        });
    })
    .catch(error => console.log(error));

export default app;
