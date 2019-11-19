import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import  route from './routes';


config();
createConnection()
    .then(async connection => {
        const app: Express.Express = Express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/', route);

        const port = process.env.PORT || 8080;
        const server: any = app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));

export default createConnection();
