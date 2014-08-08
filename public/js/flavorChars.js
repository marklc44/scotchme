
var $drops = $('.drop');
console.log($drops);

var positionDrops = function() {
	var lastVal = [];
	var y = 0;
	$drops.each(function(index) {
		var x = 0;
		var value = parseInt($(this).attr('data-value'));
		$this = $(this);

		if (value === 0) {
			$this.css('display', 'none');
		} else if (value === 4) {
			y += value * 5;
			x = 0;
		} else if (value === 1) {
			y += 0;
			x = 0;
		} else if (value === 2) {
			y += value;
			x = 0;
		} else {
			y += 15;
			x = 0;
		}

		if (lastVal.indexOf(value)) {
			y += 30;
		}

		$this.css('transform', 'translate3d('+ x + 'px,0px,0)');
		$this.css('transform', 'translate3d('+ x + 'px,' + y + 'px,0)');
		$('.dataLabel').css('opacity', '1');
		$('.dataValue').css('opacity', '1');
		lastVal.push(value);
	});
};



window.setTimeout(positionDrops, 2000);
