import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import route from './routes';
// import helmet from 'helmet';
// import cors from 'cors';
import cacheControl from 'express-cache-controller';

config();
createConnection()
    .then(async connection => {
        const app: Express.Express = Express();

        app.use(bodyParser.json());
        // app.use(helmet());
        // app.use(cors());
        app.use(cacheControl({ noCache: true }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/', route);

        const port = process.env.APP_PORT || 8080;
        const server: any = app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));

export default createConnection();
