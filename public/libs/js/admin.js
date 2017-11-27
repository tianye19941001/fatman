(function() {
	$('.del').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type:'DELETE',
			url: '/admin/article?id='+id
		})
		.done(function(results){
			if (results.success===1) {
				location.reload();
			}
		})
	})
	$('.delD').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type:'DELETE',
			url: '/admin/diary?id='+id
		})
		.done(function(results){
			if (results.success===1) {
				location.reload();
			}
		})
	})
	$('.userdel').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			type:'DELETE',
			url: '/admin/userlist?id='+id
		})
		.done(function(results){
			if (results.success===1) {
				if(tr.length>0){
					tr.remove()
				}
			}
		})
	})
})()