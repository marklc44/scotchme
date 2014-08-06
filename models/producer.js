var sem3request = require('../utils/sem3-request.js');

module.exports = function Producer(sequelize, DataTypes) {
	var Producer = sequelize.define('producer', {
		name: DataTypes.STRING,
		url: DataTypes.STRING,
		image: DataTypes.STRING(1234),
		region: DataTypes.STRING,
		region_map_image: DataTypes.STRING
	},
	{
		classMethods: {
			// Associations
			associate: function(db) {
				Producer.hasOne(db.flavor_profile);
				Producer.hasMany(db.user);
			},
			getStartingPrice: function(callback) {
				sem3request(this.dataValues.brand, function(data) {
					data.results.forEach(function(product, index) {
						var lowestPrice;
						if (typeof product.sitedetails[0].latestoffers[0] !== 'undefined') {
							// grab lowest price
							lowestPrice = product.sitedetails[0].latestoffers[0].price;
							product.sitedetails[0].latestoffers.forEach(function(offer) {
								if(offer.price < price) {
									lowestPrice = offer.price;
								}
							});
						}
					});
					callback(price);
				});
			}
		}
	});
	return Producer;
}
