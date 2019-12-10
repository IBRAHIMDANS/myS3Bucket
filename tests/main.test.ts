import { app } from '../src/main';
import { Connection, createConnection } from 'typeorm';
import supertest from 'supertest';

const server: supertest.SuperTest<supertest.Test> = supertest(app);
let connection: Connection;
let port: import('http').Server;
afterAll(async done => {
    await connection.close();
    await port.close();
    return done();
});

beforeAll(async done => {
    // Step 01: Drop database
    port = app.listen(8082);
    connection = await createConnection('Test');
    done();
});
describe('Index Test', () => {
    it('Index', function() {
        expect(true).toEqual(true);
    });
});
describe('Get index', () => {
    it('api', async done => {
        const res = await server.get('/api');
        console.log(res.status);
        expect(res.status).toBe(200);
        done();
    });
});
