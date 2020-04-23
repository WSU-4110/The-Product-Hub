const request = require('supertest');
const assert = require('chai').assert;
const app = require('../app');



//Test 1(Using supertest)
describe ('/Route search function  and header to product page', (done) =>{
    it('Test1: Search route, routes to product landing page', ()=>{
        request(app)
        .get('/search')
        .expect(202)
        .expect(done)
    });

});
//Test 2(Using supertest)
describe ('/Search function is loaded with json content type', (done) =>{
    it('Test2: Search results loaded to rendered page(product.ejs)', ()=>{
        request(app)
        .get('/search')
        .expect('Content-Type',/json/)
        .expect(done)
    });

});
//Test 3(Using supertest)
describe ('/profile route renders, with loaded variable of json content type', (done) =>{
    it('Test3: json object sent to rendered page (profile)', ()=>{
        request(app)
        .get('/profile')
        .expect('Content-Type',/json/)
        .expect(done)
    });

});
//Test 4(Using supertest)
describe ('/Parse and Post Json object from Request Form', (done) =>{
    it('Test4: JSON object parsed and posted to submitForm function', ()=>{
        request(app)
        .get('/RequestForm')
        .expect('Content-Type',/json/)
        .expect(done)
    });

});
//Test 4(Using supertest)
describe ('Create Listening end point for web application', () =>{
    it('Test5: Listening Port Created', ()=>{
        assert.equal(app());
    });

});

