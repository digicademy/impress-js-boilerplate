// @see: http://idodev.co.uk/2013/03/syntax-highlighting-with-highlightjs/
$(function(){
	$('pre code.linenumbers').each(function(){
		var lines = $(this).text().split('\n').length - 1;
		var $numbering = $('<ul/>').addClass('numbering');
		$(this)
				.addClass('has-linenumbers')
				.parent()
				.append($numbering);
		for(i=1;i<=lines;i++){
			$numbering.append($('<li/>').text(i));
		}
	});
});