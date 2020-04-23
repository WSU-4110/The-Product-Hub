const assert= require('assert');
const app= require('../Testing');



//Test1:

describe ('Database Connection', function(){
	it('Check connection to database', function(){
		
		assert.equal(app(), 'Connected');
	});
});


