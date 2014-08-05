
// model for flavor profile visualization drops
var Drop = function(key, val) {
	this.dataLabel = key;
	this.dataVal = val;
	this.radius = val * 2;
};

Drop.prototype.circum = function() {
	return Math.PI * this.radius * 2;
};

Drop.prototype.area = function() {
	return Math.PI * this.radius * this.radius;
};

// get all .drop
var $drops = $('.drop');
console.log($drops);
// order by data-value

$drops.each(function(index) {
	var y = 0;
	var x = 0;
	var value = parseInt($(this).attr('data-value'));
	$this = $(this);

	console.log(value);

	if (value === 0) {
		$this.css('display', 'none');
	} else if (value >= 4) {
		y = (value * 30) + 80;
		x = (1/value) * 25;
	} else {
		y = value * 30 + index * 20;
		x = (1/value) * 30;
	}

	$(this).css('transform', 'translate3d('+ x + 'px,' + y + 'px,0)');
		
	
});


// module.exports = Drop;