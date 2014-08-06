

var sortObj = function(obj) {
	var str = ['body','sweetness','smoky','medicinal','tobacco','honey','spicy','winey','nutty','malty','fruity','floral'];
	var arr = [];
	for (var key in obj) {
		if (str.indexOf(key) > -1) {
			var smallArray = [];
			smallArray.push(key);
			smallArray.push(obj[key]);
			arr.push(smallArray);
		}
	}
	console.log(arr);
	arr.sort(function(a, b) {
			return a[1] - b[1];
	});
	return arr;
};

module.exports = sortObj;