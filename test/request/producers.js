var app = require('../../app.js');
var request = require('supertest');

describe('Getting pages', function() {

	it('should display home page', function() {
		request(app)
			.get('/')
			.expect(200)
			.end(done)
	});
});