// Semantics3 Request
var api_key = 'SEM3F9520030F299C5ED7A3DE6AF822D2274';
var api_secret = 'MGVlNjUzYWIxOTAzNmU3YTRmMDUzYzBkZjg4ZGYxNTY';
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



	
