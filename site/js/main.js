$(document).ready(function() {
	$('img[data-hover-src]').each(function() {
		$(this).data('orig-src', $(this).attr('src'));
	}).mouseenter(function() {
		$(this).attr('src', $(this).data("hover-src"));
	}).mouseleave(function() {
		$(this).attr('src', $(this).data("orig-src"));
	});
});
