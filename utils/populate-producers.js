var db = require('../models/index.js');
var data = require('./producer_data.js');
console.log(data);

// Create Producers Utility
data.forEach(function(producer, index) {
	db.producer.create({
		name: producer.name,
	  url: producer.url,
	  image: producer.image,
	  region: producer.region,
	  region_map_image: null
	}).done(function(producer) {
		console.log('Producer '  + index + ': ', producer);
	});
});