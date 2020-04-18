const assert = require('chai').assert;
const food = require('./food').food;

describe('food', function(){
    it('category should appear', function (){
        let result = food();
        assert.equal(result, 'category');
    });
});
