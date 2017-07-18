window.onload=function(){
	$(".header .title  p").eq(0).find("a").css({
		"background":"url('images/line3.png') no-repeat left center",
		"z-index":"3"
	});
	$(".header .title  p").eq(1).find("a").css({
		"background":"url('images/line6.png') no-repeat left center",
		"z-index":"2",
		"padding-left":"55px"
	});
	$(".header .title  p").eq(2).css({
		"width":"198px"
	});
	$(".header .title  p").eq(2).find("a").css({
		"background":"url('images/line7.png') no-repeat left center",
		"z-index":"1",
		"padding-left":"55px"
	});
	$(".content .pay .pay_type .top p").find("input").click(function(){
		$(this).parents("div").find("img").removeClass("checked");
		$(this).next().addClass("checked");
	});
	if(!ShopCar.isEmpty()){
		$(".content .pay .pay_mess div p b").text("0.00");
		$(".content .pay .head ul li span").text("￥0.00");
		return;
	};
	var totalAmount=ShopCar.getProductList().totalAmount;
	$(".content .pay .pay_mess div p b").text(totalAmount);
	$(".content .pay .head ul li span").text("￥"+totalAmount);
}
	