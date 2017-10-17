
$(document).ready(function(){
	var ty_public = { //公共函数
		brower: function(){
			var userAgent = navigator.userAgent; 
		    var isOpera = userAgent.indexOf("Opera") > -1;
		    if (isOpera) {
		        return "Opera"
		    }; 
		    if (userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    } 
		    if (userAgent.indexOf("Chrome") > -1){
			  return "Chrome";
			 }
		    if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    } 
		    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		    	var IEMethod = userAgent.slice(userAgent.indexOf("MSIE")+5,userAgent.indexOf("MSIE")+6);
		        return IEMethod;
		    }
		},
		stopDefault:function(e){
			if ( e && e.preventDefault ){
				e.preventDefault(); 
			}else{
				window.event.returnValue = false; 
				return false;
			}
		},
		stopBubble:function(e){
			if ( e && e.stopPropagation ){
				e.stopPropagation(); 
			}else{
				window.event.cancelBubble = true;
				return false;
			}
		}
	}
	var lignts = $('.deathlight');
		btnL = $('.ty_confirm');
	function autoheight(){
		var Nwidth = $(window).width(),
			allpoint = Nwidth/1680;
		$('html').css('zoom',allpoint)
	}
	function turnoff(thi){
		if(thi.hasClass('off')) {
			thi.removeClass('off').addClass('on');
		}else{
			thi.removeClass('on').addClass('off');
		}
	}
	$(window).resize(function() {
 		autoheight();
	});
	autoheight();
	lignts.click(function(){
		if ($(this).parent().hasClass('active')) {
			if ($(this).hasClass('diasbled')) {
				return false;
			}else{
				turnoff($(this));
			}
		}else{
			$(this).parent().addClass('active').siblings().removeClass('active').children().not('.diasbled').removeClass('on').addClass('off');
			if ($(this).hasClass('diasbled')) {
				return false;
			}else{
				turnoff($(this));
			}
		}
	})
	btnL.click(function(e){
		ty_public.stopDefault(e);
		$('.deathlight.on').addClass('diasbled');
	})
})