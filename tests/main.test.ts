
import * as app from '../src/main';
import { expect } from 'chai';
import { Connection, createConnection } from 'typeorm';
import { agent as request } from 'supertest';
import supertest from 'supertest';

const server = supertest(app);

let connection: Connection;

afterAll(async done => {
    await app.close();
    return done();
});

beforeAll(async done => {
    // Step 01: Drop database
    connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();

    // Step 02: ReOpen Database
    connection = await createConnection();

    // TODO: delete
    // connection.query("CREATE DATABASE IF NOT EXISTS");
    done();
});
describe('Index Test', () => {
    it('Index', function() {
        expect(true).to.equal(true);
    });
    // it('should Get /', async done => {
    //     //console.log(done);
    //     const res = await request(server).get('/');
    //     await expect(res.status).to.equal(200);
    //
    //     done();
    // });
});
describe('Get', () => {
    it('api', async done => {
        const res = await server.get('/api');
        console.log('res');
        console.log(res.status);
        expect(res.status).to.be(String(200));
        done();
    });
});
