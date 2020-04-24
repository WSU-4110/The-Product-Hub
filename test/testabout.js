const assert= require('assert');
const app= require('../TestingAbout');


//Test4:
describe ('Render Register Page', function(){
	it('Check if rendered to about Page', function(){
		
		assert.equal(app(), true);
	});
});