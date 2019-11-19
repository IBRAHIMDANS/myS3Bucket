import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { User } from './entity/User';

config();
createConnection()
    .then(async connection => {
        const app: Express.Express = Express();

        app.use(bodyParser.json());
        const port = process.env.PORT || 8080;

        app.get('/', (req: Express.Request, res: Express.Response) => {
            res.json({
                'project Name': 'myS3',
                author: ['Ibrahima Dansoko', 'Benjamin Benoit'],
            });
        });

        // register express routes from defined application routes
        Routes.forEach(route => {
            (app as any)[route.method](
                route.route,
                (req: Request, res: Response, next: Function) => {
                    const result = new (route.controller as any)()[
                        route.action
                        ](req, res, next);
                    if (result instanceof Promise) {
                        result.then(result =>
                            result !== null && result !== undefined
                                ? res.send(result)
                                : undefined,
                        );
                    } else if (result !== null && result !== undefined) {
                        res.json(result);
                    }
                },
            );
        });
        // insert new users for test
        await connection.manager.save(
            connection.manager.create(User, {
                firstName: 'Timber',
                lastName: 'Saw',
                age: 27,
            }),
        );
        await connection.manager.save(
            connection.manager.create(User, {
                firstName: 'Phantom',
                lastName: 'Assassin',
                age: 24,
            }),
        );
        const server: any = app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));

export default createConnection();
