var $dSearchInputs = $('.flavor-module').find('input[type="text"]');
var $dialBoxes = $('.dial-box');

var highlightDials = function($input, value) {
	$input.siblings('.dial-wrapper').find('.dial-box')
		.each(function() {
			console.log($(this));
			var num = $(this).attr('data-position');
			if(num <= value) {
				$(this).addClass('highlight');
			} else {
				$(this).removeClass('highlight');
			}
		});
};

$dSearchInputs.each(function() {
	$(this).keyup(function() {
		var value = $(this).val();
		highlightDials($(this), value);
	});
});

$dialBoxes.click(function() {
	var $thisInput = $(this).parent().siblings('input[type="text"]');
	var thisValue = $(this).attr('data-position');
	$thisInput.val(thisValue);
	highlightDials($thisInput, thisValue);
});

// add .hover to highlight all dial-boxes up to the clicked dial box