
$(".header .foot .nav_middle li").eq(0).addClass("on");
$(".content .list_right .bot .product_list .text img").click(function(){
	var attr=$(this).attr("src");
	var arr=parseInt(attr.split('ico')[1]);
	var src=arr>37?"images/ico37.png":"images/ico38.png";
	$(this).attr("src",src);
})
$(".content .list_right .bot .product_list .text button").click(function(){
	var str=$(this).parents(".text").prev().find("img").attr("src");
	var src=parseInt(str.split('pic')[1]);
	var i=0;
	switch(src){
		case 39:
			i=0;
		break;
		case 40:
			i=1;
		break;
		case 41:
			i=2;
		break;
		case 42:
			i=3;
		break;
	}	
	var product = products[i];
	product.number = 1;
	ShopCar.addProduct(product); 
	var badge = document.querySelector("[class=badge]");
	badge.innerHTML = ShopCar.getProductList().totalNumber;
})
var showCarNum = function(){
	var badge = document.querySelector("[class=badge]");
	if(!ShopCar.isEmpty()){
		return;
	};
	badge.innerHTML = ShopCar.getProductList().totalNumber;
}
window.onload=function(){
	showCarNum();
}