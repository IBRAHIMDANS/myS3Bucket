import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import route from './routes';
// import * as helmet from 'helmet';
import cors from 'cors';
import cacheControl from 'express-cache-controller';
import * as http from 'http';

config();
export let server: http.Server;

async function bootstrap(): Promise<any> {
    const app: Express.Express = Express();
    const port = process.env.APP_PORT || 8080;
    createConnection()
        .then(async () => {
            app.use(bodyParser.json());
            // app.use(helmet()); not working typescript
            app.use(cors());
            app.use(cacheControl({ noCache: true }));
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use('/', route);
            server = app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch(error => console.log(error));
}
bootstrap();
