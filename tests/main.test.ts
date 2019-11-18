import app from '../src/main';
import { agent as request } from 'supertest';
import { expect } from 'chai';


describe('Index Test', () => {
    it('Index', function () {
        expect(true).to.equal(true);

    });
    it('should Get /', async () => {
        const res = await request(app).get('/');
       await expect(res.status).to.equal(200);
    });
});

// describe('Test the root path', () => {
//   test('It should response the GET method', (done) => {
//     request(app).get('/').then((response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });
// });

// describe(':: devNull', (): void => {
//   it('devNull()', () => {
//     expect(devNull()).eql({ hello: 'Efrei' })
//   })
// })
