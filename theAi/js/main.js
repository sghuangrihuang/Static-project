$(function(){
	$('.header .navbox .alllist h3').on('click',function(){
		$(this).siblings().stop(true,false).slideToggle();
	})
})