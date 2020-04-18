const assert = require('chai').assert;
const other = require('./other').other;

describe('other', function(){
    it('category should appear', function (){
        let result = other();
        assert.equal(result, 'category');
    });
});