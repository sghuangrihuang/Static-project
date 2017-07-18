var productLoad = function(){
 		if(!ShopCar.isEmpty()){
 			document.getElementById("allconut").innerHTML=0;
			document.getElementById("allsum1").innerHTML="￥0.00";
			document.getElementById("allsum2").innerHTML="￥0.00";
			document.getElementById("allsum3").innerHTML="￥0.00";
 			return;
 		};
		var carData = ShopCar.getProductList(); 
		var productList = carData.productList;
		document.getElementById("allconut").innerHTML=carData.totalNumber;
		document.getElementById("allsum1").innerHTML="￥"+carData.totalAmount;
		document.getElementById("allsum2").innerHTML="￥"+carData.totalAmount;
		document.getElementById("allsum3").innerHTML="￥"+carData.totalAmount;
		var divlist =document.getElementById("list");
		for(var i in productList){
			
			var div = document.createElement("div");
			div.setAttribute("class","body");

			//商品图片 名称
			var p1 = document.createElement("p");	
			p1.setAttribute("class","pic");
			var a1 = document.createElement("a");
			a1.setAttribute("href","pro_detail.html");
			var img=document.createElement("img");
			img.setAttribute("src",productList[i].img);
			a1.appendChild(img);

			var a2 = document.createElement("a");
			a2.setAttribute("href","pro_detail.html");
			var b1= document.createElement("b");
			var b1text=document.createTextNode("套装");
			b1.appendChild(b1text);
			var span1= document.createElement("span");
			var txt1 = document.createTextNode(productList[i].name);
			span1.appendChild(txt1);
			a2.appendChild(b1);
			a2.appendChild(span1);

			p1.appendChild(a1);
			p1.appendChild(a2);
			div.appendChild(p1);

			//单价
			var p2 = document.createElement("p");
			
			var txt2 = document.createTextNode("¥"+(productList[i].price).toFixed(2));
			p2.appendChild(txt2);

			div.appendChild(p2);

			//商品数量
			var p3 = document.createElement("p");
			var txt3 =document.createTextNode(productList[i].number);
			p3.appendChild(txt3);
			div.appendChild(p3);

			//小计
			var p4 = document.createElement("p");
			var txt4 = document.createTextNode("¥"+(productList[i].number*productList[i].price).toFixed(2));
			p4.appendChild(txt4);
			div.appendChild(p4);
			

			divlist.appendChild(div);
		}
 }
window.onload=function(){
	$(".header .title  p").eq(0).find("a").css({
		"background":"url('./images/line3.png') no-repeat left center",
		"z-index":"3"
	})
	$(".header .title  p").eq(1).find("a").css({
		"background":"url('./images/line6.png') no-repeat left center",
		"z-index":"2",
		"padding-left":"55px"
	})
	$(".header .title  p").eq(2).css({
		"width":"198px"
	})
	$(".header .title  p").eq(2).find("a").css({
		"background":"url('./images/line5.png') no-repeat left center",
		"z-index":"1",
		"padding-left":"55px"
	})
	productLoad();
}