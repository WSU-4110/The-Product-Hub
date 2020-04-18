const assert = require('chai').assert;
const entertainment = require('./entertainment').entertainment;

describe('entertainment', function(){
    it('category should appear', function (){
        let result = entertainment();
        assert.equal(result, 'category');
    });
});