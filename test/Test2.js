const assert = require('chai').assert;
const electronic = require('./electronic').electronic;

describe('electronic', function(){
    it('electronic should appear', function (){
        let result = electronic();
        assert.equal(result, 'electronic');
    });
});
