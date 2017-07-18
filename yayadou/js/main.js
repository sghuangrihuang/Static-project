/*头部*/
$(function(){
	$(".header .nav ul li").click(function(){
		var index = $(this).index();
		index = (index > 0) ? (index +2 ) : 0;
		$("#fp-nav ul li").eq(index).find("span").click();
	})
})
/*------------------学员作品------------------- */
$(function(){

	var index=0,adtimer,len=4;
	//轮播左右按钮触发事件
	$(".page7 .list .prev").click(function(){
		if(!$(".page7 .list ul").is(":animated")){
			index=(index-1+len)%len;
			showtime(index);
		}
	});
	$(".page7 .list .next").click(function(){
		if(!$(".page7 .list ul").is(":animated")){
			index=(index+1+len)%len;
			showtime(index);
		}
	});
	//banner轮播hover触发
	$(".page7 .list").hover(function(){
		clearInterval(adtimer);
	},function(){
		adtimer=setInterval(function(){
			index++;
			if(index==len)
				index=0;
			showtime(index);
		},2500);
	}).trigger('mouseleave');
	//定义轮播函数
	function showtime(index){
		if(!$(".page7 .list ul").is(":animated")){
			var wid=$(".page7 .list ul li").outerWidth(true);
			$(".page7 .list ul").stop(true,false).animate({
				left:-wid*index
			},600);
		}
	};
})
/*------------------UI设计课程方向------------------- */
var tabsshow=function(elem){

	var ele=$(elem);
	var tabs=ele.find(".tabs").find("li");
	var tab=ele.find(".tab");
	//选项卡
	tabs.click(function(){
		var index=$(this).index();
		tabs.removeClass("on").eq(index).addClass("on");
		tab.hide();
		tab.eq(index).show();
	}).eq(0).click();
	//视频点击切换
	var videoli=ele.find(".video").find("li");
	videoli.click(function(){
		var index=$(this).index();
		var videolist=$(this).parents(".box").find('.videos');
		videolist.eq(index).show();
		videolist.eq(index).click(function(){
			$(this).hide();
		})
	});
	//我要报名选项
	var form=ele.find(".form").find("p");
	form.find("span").click(function(){
		var index=$(this).parent().index()-1;
		form.removeClass("check").eq(index).addClass('check');
	}).eq(0).click();
}

$(function(){
	for(var i=1;i<=3;i++){
		var elem=".page4_"+i;
		tabsshow(elem);
	}
})

/*------------------学员就业情况------------------- */
$(function(){
	var stuBox = document.getElementById('scoll'),
    stuEl = document.getElementById("scollul"),
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

/*------------------丫丫豆学员------------------- */
$(function(){

	var page6 = new Swiper('.page6 .bd', {
	        pagination: '.page6 .hd',
	        autoplay: 3000,
	        paginationClickable: true,
	        effect : 'slide',
	        prevButton:".page6 .aprev",
	        nextButton:".page6 .anext",
	        loop:true
	    });
	// var indexs=0,adtimers,lens=$(".page6 .bd ul li").length;
	// //轮播中间按钮触发事件
	// $(".page6 .hd li").click(function(){
	// 	indexs=$(this).index();
	// 	showtimes(indexs);
	// }).eq(0).click();
	// //轮播左右按钮触发事件
	// $(".page6 .list .aprev").click(function(){
	// 	if(!$(".page6 .bd ul").is(":animated")){
	// 		indexs=(indexs-1+lens)%lens;
	// 		showtimes(indexs);
	// 	}
	// });

	// $(".page6 .list .anext").click(function(){
	// 	if(!$(".page6 .bd ul").is(":animated")){
	// 		indexs=(indexs+1+lens)%lens;
	// 		showtimes(indexs);
	// 	}
	// });
	// //banner轮播hover触发
	// $(".page6 .bd").hover(function(){
	// 	clearInterval(adtimers);
	// },function(){
	// 	adtimers=setInterval(function(){
	// 		indexs++;
	// 		if(indexs==lens)
	// 			indexs=0;
	// 		showtimes(indexs);
	// 	},5000);
	// }).trigger('mouseleave');
	// //定义轮播函数
	// function showtimes(index){
	// 	if(!$(".page6 .bd ul").is(":animated")){
	// 		var wid=$(".page6 .bd ul li").outerWidth(true);
	// 		$(".page6 .bd ul").stop(true,false).animate({
	// 			left:-wid*indexs
	// 		},600);
	// 		$(".page6 .hd li").removeClass("hover").eq(indexs).addClass("hover");
	// 	}
	// };
})