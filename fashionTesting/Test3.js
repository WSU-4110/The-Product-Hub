const assert = require('chai').assert;
const fashion = require('./fashion').fashion;

describe('fashion', function(){
    it('category should appear', function (){
        let result = fashion();
        assert.equal(result, 'category');
    });
});