const assert= require('assert');
const app= require('../Testing3');


//Test3:
describe ('Render Index Page', function(){
	it('Check if rendered to Index Page', function(){
		
		assert.equal(app(), true);
	});
});
