
var index=0,adtimer,len=$(".bann ul li").length,bool=true;
//banner轮播按钮点击
$(".bann_btn ul li").click(function(){
	index=$(this).index();
	showtime(index);
}).eq(0).click();

$(".banner").hover(function(){
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
	if(bool){
		bool=false;
		var wid=$(".bann ul li").width();
		$(".bann ul").stop(true,false).animate({
			left:-wid*index
		},800,function(){
			bool=true;
		});
		$(".bann_btn ul li").removeClass("hover").eq(index).addClass("hover");
	}
};
var showCarNum = function(){
	var badge = document.querySelector("[class=badge]");
	if(!ShopCar.isEmpty()){
		return;
	};
	badge.innerHTML = ShopCar.getProductList().totalNumber;
}
window.onload=function(){
	$(".header .foot .nav_middle li").eq(0).addClass("on");
	showCarNum();
};
	
// //定义placeholder函数;
// function placeholder(event){
// 	for(var i=0;i<event.length;i++){
// 		var self=event[i];
// 		var placeholder=self.getAttribute('placeholder')||'';
// 		// if(self.value==""){
// 		// 	self.value=placeholder;
// 		// }
// 		self.onfocus=function(){
// 			if(self.value==placeholder){
// 				self.value ="";
// 			}
// 		}
// 		self.onblur=function(){
// 			if(self.value==""){
// 				self.value=placeholder;
// 			}
// 		}
// 	}
// }

// $("input,textarea").placeholder();