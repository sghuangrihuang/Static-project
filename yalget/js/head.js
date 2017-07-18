$(".header .nav_left ul > a").click(function(){
	$(".header .foot .nav_left ol").toggle(100);
});
//左边导航的背景
for(var i=0;i<$(".foot .list ul li").length;i++){
	$(".foot .list ul li").eq(i).find("a").css("background","url('images/ico"+(i+6)+".png') no-repeat 88% center");
}
//地址选中
$(".content .confirm_place div").click(function(){
	$(this).siblings().removeClass("on").end().addClass("on");
}).eq(0).click();
//注册页面选中按钮
$(".content .container .register .reg_right .person b").click(function(){
	$(this).siblings().removeClass("hover").end().addClass("hover");
}).eq(0).click();	

$(".content .container .register .reg_right .agree b").click(function(){
	if($(this).hasClass("hover")){
		$(this).removeClass("hover");
	}
	else{
		$(this).addClass("hover");
	}
});
var bool1=false,bool2=false,bool3=false;
var isclick1=false,isclick2=false,isclick3=false;
var star1=$(".content .comments .comments_right p i"),
	star2=$(".content .comments .comments_bottom p").eq(0).find("i"),
	star3=$(".content .comments .comments_bottom p").eq(1).find("i");
//评论打分
$(".content .comments .comments_right p i").click(function(){
	if(isclick1==false){
		var index=$(this).index();
		for(var i=0;i<index+1;i++){
			star1.eq(i).addClass("hover");
		}
		bool1=true;
		isclick1=true;
	}
});
$(".content .comments .comments_right p i").hover(function(){
	if(isclick1==false){
		var index=$(this).index();
		star1.removeClass("hover");
		for(var i=0;i<index+1;i++){
			star1.eq(i).addClass("hover");
		}
	}
},function(){
	if(bool1==false){
		star1.removeClass("hover");
	}
});

$(".content .comments .comments_bottom p").eq(0).find("i").click(function(){
	if(isclick2==false){
		var index=$(this).index();
		for(var i=0;i<index+1;i++){
			star2.eq(i).addClass("hover");
		}
		bool2=true;
		isclick2=true;
	}
});

$(".content .comments .comments_bottom p").eq(0).find("i").hover(function(){
	if(isclick2==false){
		var index=$(this).index();
		star2.removeClass("hover");
		for(var i=0;i<index+1;i++){
			star2.eq(i).addClass("hover");
		}
	}
},function(){
	if(bool2==false){
		star2.removeClass("hover");
	}
});

$(".content .comments .comments_bottom p").eq(1).find("i").click(function(){
	if(isclick3==false){
		var index=$(this).index();
		for(var i=0;i<index+1;i++){
			star3.eq(i).addClass("hover");
		}
		bool3=true;
		isclick3=true;
	}
});

$(".content .comments .comments_bottom p").eq(1).find("i").hover(function(){
	if(isclick3==false){
		var index=$(this).index();
		star3.removeClass("hover");
		for(var i=0;i<index+1;i++){
			star3.eq(i).addClass("hover");
		}
	}
},function(){
	if(bool3==false){
		star3.removeClass("hover");
	}
});

$(".content .comments .comments_right input").click(function(){
	var str=($(this).val()=="收起评论")?"展开评论":"收起评论";
	$(".content .comments .comments_right textarea").toggle(200);
	$(".content .comments .comments_right span").toggle(200);
	$(this).val(str);
})