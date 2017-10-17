(function() {
	$('.ty_admin_GetArticle').click(function(){
		var url = $('.ty_admin_AdrArticle').val();
		$.ajax({
			url:'/Crawler',
			type:'post',
			data:{url:url},
			success:function(data){
				if (data) {
					console.log(data);
					$('.ty_admin_TitArticle').val(data.title);
					$('.ty_admin_ConArticle').val(data.summary);
				}
			}
		})
	})
})()