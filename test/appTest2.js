const assert= require('assert');
const app= require('../Testing2');


//Test2:
describe ('Render Home Page', function(){
	it('Check if rendered to home Page', function(){
		
		assert.equal(app(), true);
	});
});
