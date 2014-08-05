

// Semantics3 Request
var api_key = process.env.SEM3_KEY;
var api_secret = process.env.SEM3_SECRET;
var sem3 = require('semantics3-node')(api_key,api_secret);

module.exports = function(brand, callback) {

	var results;

	sem3.products.products_field("cat_id", 11481);
	sem3.products.products_field("brand", brand);
	sem3.products.products_field("limit", 10);

	sem3.products.get_products(function(err, products) {
		if(err) {
			console.log("Couldn't execute query");
			return;
		}
		callback(products);
	});
};



	
