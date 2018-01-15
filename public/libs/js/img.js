(function(){
	$('.ty_picall li a,.ty_pic_list li').click(function(e){
		e.preventDefault();

		var url = $(this).find('img').attr('src');

		if ($('.ty_show_big').length) {
			$('.ty_show_big img').attr('src',url);
			$('.ty_show_big').fadeIn();
		}else{
			var newWarp = $('<div class="ty_show_big"></div>');

			var myImg = $('<img src="' + url +'"" />');

			myImg.appendTo(newWarp);
			newWarp.appendTo($('body'));
		}
	})

	$('body').on('click','.ty_show_big',function(){
	  $(this).slideUp();
	})
})()