
jQuery(function($) {
	var postfix = '_on';
	$('a.imgover img').not('[src*="'+ postfix +'."]').each(function() {
		var img = $(this);
		var src = img.attr('src');
		var src_on = src.substr(0, src.lastIndexOf('.'))
				   + postfix
				   + src.substring(src.lastIndexOf('.'));
		$('<img>').attr('src', src_on);
		img.hover(function() {
			img.attr('src', src_on);
		}, function() {
			img.attr('src', src);
		});
	});

	$('a.over img').hover(function(){
		$(this).fadeTo(100,0.8);
	}, function(){
		$(this).fadeTo(100,1);
	});


	$('.anchor').click(function(){
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top });
		return false;
	});
        
        

});