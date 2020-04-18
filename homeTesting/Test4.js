const assert = require('chai').assert;
const homePage = require('./homePage').homePage;

describe('homePage', function(){
    it('category should appear', function (){
        let result = homePage();
        assert.equal(result, 'category');
    });
});