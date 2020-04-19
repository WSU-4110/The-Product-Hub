const request = require('supertest');
const assert = require('chai').assert;
const app = require('../app');



//Test 3(Using supertest)
describe ('/profile route renders, with loaded variable of json content type', (done) =>{
    it('Test3: json object sent to rendered page (profile)', ()=>{
        request(app)
        .get('/profile')
        .expect('Content-Type',/json/)
        .expect(done)
    });

});

