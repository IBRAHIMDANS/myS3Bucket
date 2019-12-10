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
// import * as helmet from 'helmet';

config();
export let server: http.Server;

export const app: Express.Express = Express();
export const port = process.env.APP_PORT || 8080;
const MYS3DATADIR = `${process.env.MYS3Storage}`;
if (!fs.existsSync(MYS3DATADIR)) {
    fs.mkdirSync(MYS3DATADIR);
}
createConnection(process.env.APP_ENV as string)
    .then(async () => {
        app.use(bodyParser.json());
        // app.use(helmet()); not working typescript
        app.use(cors());
        app.use(passport.initialize());
        app.use(cacheControl({ noCache: true }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/api', route);
        server = app.listen(port, () => {
            console.log(`server started at http://localhost:${port}/api`);
        });
    })
    .catch(error => console.log(error));
