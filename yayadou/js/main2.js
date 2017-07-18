
/*------------------学员就业情况------------------- */
$(function(){
	var stuBox = document.getElementById('ascoll'),
    stuEl = document.getElementById("ascollul"),
    timer = null,
    iSpeed = 1;
	stuEl.innerHTML+=stuEl.innerHTML;
	stuBox.onmouseover = function(){
	    clearInterval(timer);
	};
	stuBox.onmouseout = function(){
	    timer=setInterval(moveScroll, 30);
	} 
	timer=setInterval(moveScroll, 30);

	moveScroll();
	function moveScroll(){
	    if(stuEl.offsetTop<-stuEl.offsetHeight/2)
	    {
	        stuEl.style.top = 0;
	    }
	    else if(stuEl.offsetTop>0)
	    {
	        stuEl.style.top = -stuEl.offsetHeight/2 + 'px';
	    }
	    stuEl.style.top  = stuEl.offsetTop - iSpeed + 'px';
	}
})

/*------------------UI设计课程方向------------------- */
var tabsshow=function(elem){

	var ele=$(elem);
	var tabs=ele.find(".tabs").find("li");
	var tab=ele.find(".tab");

	tabs.click(function(){
		var index=$(this).index();
		tabs.removeClass("on").eq(index).addClass("on");
		tab.hide().eq(index).show();
	}).eq(0).click();

	var videoli=ele.find(".video").find("li");
	videoli.click(function(){
		var index=$(this).index();
		var videolist=$(this).parents(".box").find('.videos');
		videolist.eq(index).show();
		videolist.eq(index).click(function(){
			$(this).hide();
		})
	});
}
$(function(){
	for(var i=1;i<=3;i++){
		var elem=".list"+i;
		tabsshow(elem);
	}
})