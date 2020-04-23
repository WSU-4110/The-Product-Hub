const assert= require('assert');
const app= require('../Testing');


//Test1:

describe ('Database Connection', function(){
	it('Check connection to database', function(){
		
		assert.equal(app(), 'Connected');
	});
});

//Test2:
describe ('Render Home Page', function(){
	it('Check if rendered to home Page', function(){
		
		assert.equal(app(), true);
	});
});


//Test3:
describe ('Render Index Page', function(){
	it('Check if rendered to Index Page', function(){
		
		assert.equal(app(), true);
	});
});


//Test4:
describe ('Render Register Page', function(){
	it('Check if rendered to Register Page', function(){
		
		assert.equal(app(), true);
	});
});




//Test5:

describe ('Redirect to secret Page', function(){
	it('Check if redirected to secret Page', function(){
		
		assert.equal(app(), true);
	});
});