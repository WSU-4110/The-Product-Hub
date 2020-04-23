const assert= require('assert');
const app= require('../Testing4');


//Test4:
describe ('Render Register Page', function(){
	it('Check if rendered to Register Page', function(){
		
		assert.equal(app(), true);
	});
});

