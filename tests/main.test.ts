import app from '../src/main';
import { Connection, createConnection } from 'typeorm';
import supertest from 'supertest';

const server: supertest.SuperTest<supertest.Test> = supertest(app);
let connection: Connection;
let port: import('http').Server;

beforeAll(async done => {
    // Step 01: Drop database
    port = app.listen(8082);
    connection = await createConnection('Test');
    connection.synchronize(true).then(async () => {
        console.log('ok');
    });
    await connection.dropDatabase();
    done();
});

afterAll(async done => {
    port.close();
    await connection.close();
    return done();
});

describe('Index Test', () => {
    it('Index', () => {
        expect(true).toEqual(true);
    });
});
describe('Get index', () => {
    it('api', async done => {
        const res = await server.get('/api');
        expect(res.status).toBe(200);
        done();
    });
});
describe('Route Auth', () => {
    // it('Register', async done => {
    //     const res = await server
    //         .post('api/user')
    //         .set({ Accept: 'application/json' })
    //         .send({
    //             nickname: 'toto',
    //             email: 'ibrahimdansoko@gmail.com',
    //             password: 'root123',
    //         });
    //     expect(res.status).toBe(200);
    //     done();
    // });
    // it('Login', async done => {
    //     const res = await server
    //         .post('auth/login')
    //         .set({ Accept: 'application/json' })
    //         .send({
    //             email: 'ibrahimdansoko@gmail.com',
    //             password: 'root123',
    //         });
    //     expect(res.status).toBe(200);
    //     done();
    // });
});
describe('Test route user', () => {
    it('get User without token', async done => {
        const res = await server.get('/api/users');
        expect(res.status).toBe(401);
        done();
    });
    it('get User with token', async done => {
        const res = await server.get('/api/users');
        expect(res.status).toBe(401);
        done();
    });
});
