var db = require('../models/index.js');
var flavorData = require('./broad_flavors.js');

// console.log(flavorData);

flavorData.forEach(function(item, index) {
	db.flavor_profile.find({
		where: {
			producerId: item.id
		}
	}).success(function(profile) {
		profile.updateAttributes({
			broad_keyword: item.b1,
			broad_keyword2: item.b2
		});

	});
});