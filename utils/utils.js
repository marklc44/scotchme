var sortObj = function(obj, prop) {
	var str = ['Body','Sweetness','Smoky','Medicinal','Tobacco','Honey','Spicy','Winey','Nutty','Malty','Fruity','Floral'];
	var arr = [];
	for (var key in obj) {
		if (str.indexOf(key) > -1) {
			var newOb = {
				name: key,
				val: obj[key]
			};
			arr.push(newOb);
		}
	}
	arr.sort(function(a, b) {
			return a.val - b.val;
	});
	return arr;
};

module.exports = sortObj;