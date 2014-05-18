$(document).ready(function() {
	$('.hoverGif').mouseenter(function() {
		$(this).attr('src', $(this).data("hover"));
	});
	$('.hoverGif').mouseleave(function() {
		$(this).attr('src', $(this).data("orig"));
	});
});
