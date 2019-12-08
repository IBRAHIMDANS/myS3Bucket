import { app, port } from '../src/main';
import { expect } from 'chai';
import { Connection, createConnection } from 'typeorm';
import supertest from 'supertest';

// const server = supertest(app);
//
// let connection: Connection;

// afterAll(async done => {
//     await connection.close();
//     return done();
// });
//
// beforeAll(async done => {
//     // Step 01: Drop database
//     connection = await createConnection();
//     await connection.dropDatabase();
//     await connection.close();
//     done();
// });
describe('Index Test', () => {
    it('Index', function() {
        expect(true).to.equal(true);
    });
});
describe('Get', () => {
    it('api', async done => {
        const res = await server.get('/api');
        console.log('res');
        console.log(res.status);
        expect(res.status).to.be('string', '200');
        done();
    });
});
