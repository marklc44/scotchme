// var oauth = OAuth({
// 	consumer: {
// 		public: 'SEM3F9520030F299C5ED7A3DE6AF822D2274',
// 		secret: 'MGVlNjUzYWIxOTAzNmU3YTRmMDUzYzBkZjg4ZGYxNTY'
// 	},
// 	signature_method: 'HMAC-SHA1'
// });

// var request_data = {
// 	url: 'https://api.semantics3.com/v1/products',
// 	method: 'get',
// 	data: {
// 		"cat_id": 11481,
// 		"brand": "Bowmore",
// 		"limit":10
// 	}
// };

// var token = {
// 	public: 'SEM3F9520030F299C5ED7A3DE6AF822D2274',
// 	secret: 'MGVlNjUzYWIxOTAzNmU3YTRmMDUzYzBkZjg4ZGYxNTY'
// };

// $.ajax({
//     url: request_data.url,
//     type: request_data.method,
//     data: oauth.authorize(request_data, token)
// }).done(function(data) {
//     console.log(data);
// });
