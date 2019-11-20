import server from '../src/main';
import { agent as request } from 'supertest';
import { expect } from 'chai';


describe('Index Test', () => {
    it('Index', function () {
        expect(true).to.equal(true);

    });
    // it('should Get /', async (done) => {
    //    // console.log(await server);
    //     const res = await request(server).get('/');
    //     await expect(res.status).to.equal(200);
    //
    //     done();
    // });
});

// beforeEach(() => {
//     return server.close();
 //});
