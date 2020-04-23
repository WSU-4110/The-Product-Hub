const assert= require('assert');
const app= require('../Testing5');
//Test5:

describe ('Redirect to secret Page', function(){
	it('Check if redirected to secret Page', function(){
		
		assert.equal(app(), true);
	});
});