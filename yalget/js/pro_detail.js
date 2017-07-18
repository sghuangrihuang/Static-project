//减少按钮
var reduce=function(){
		var num = document.getElementById("pro_num");
	var reduce = document.getElementById("reduce");
	var count = parseInt(num.value);
	if(count <= 1){
		reduce.setAttribute("disabled","disabled");
		return; 
	}
	num.value=--count;
}
var add = function(){
	var num = document.getElementById("pro_num");
	var reduce = document.getElementById("reduce");
	var count = parseInt(num.value);
	if(count > 1){
		reduce.removeAttribute("disabled");
	}
	num.value=++count;
}
var addShopCar=function(){
	var num = document.getElementById("pro_num").value;
	var product = products[4];
	product.number = parseInt(num);
	ShopCar.addProduct(product); 
	var badge = document.querySelector("[class=badge]");
	badge.innerHTML = ShopCar.getProductList().totalNumber;
}


var showCarNum = function(){
	var badge = document.querySelector("[class=badge]");
	if(!ShopCar.isEmpty()){
		return;
	};
	badge.innerHTML = ShopCar.getProductList().totalNumber;
}
window.onload=function(){
	$(".header .foot .nav_middle li").eq(0).addClass("on");
	$(".content .product .pro_pic .pro_left ul li").click(function(){
		var src=$(this).children().attr("src");
    	$(".pro_pic .pro_left p a img").attr("src",src);
		$(this).siblings().removeClass("on").end().addClass("on");
	}).eq(0).click();
	showCarNum();
}