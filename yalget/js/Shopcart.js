 //刷新数据
 var refreshdata =function(){
	var carData = ShopCar.getProductList(); 
	document.getElementById("totalNumber").innerHTML=carData.totalNumber;
	document.getElementById("totalAmount").innerHTML="￥"+carData.totalAmount;
 }
//数据的导入
 var productLoad = function(){
 		if(!ShopCar.isEmpty()){
			$('#allchecked2').removeClass('hover');
			$('#allchecked1').removeClass('hover');
 			return;
 		};
		var carData = ShopCar.getProductList(); 
		var productList = carData.productList;
		document.getElementById("totalNumber").innerHTML=carData.totalNumber;
		document.getElementById("totalAmount").innerHTML="￥"+carData.totalAmount;

		var divbody =document.getElementById("shop_body");
		for(var i in productList){
			
			var div = document.createElement("div");
			div.setAttribute("class","bot");
			div.setAttribute("id","div_"+productList[i].id);

			//复选框和商品图片
			var p1 = document.createElement("p");	
			var i1 = document.createElement("i");
			i1.setAttribute("value" ,productList[i].id);
			i1.setAttribute("id","check");
			i1.setAttribute("class","hover");
			i1.setAttribute("onclick","Select("+productList[i].id+")");
			var a1 = document.createElement("a");
			a1.setAttribute("href","pro_detail.html");
			var img=document.createElement("img");
			img.setAttribute("src",productList[i].img);
			a1.appendChild(img);
			p1.appendChild(i1);
			p1.appendChild(a1);
			div.appendChild(p1);

			//名称
			var p2 = document.createElement("p");
			p2.setAttribute("class","mess");
			var b2=document.createElement("b");
			var b2text=document.createTextNode("套装");
			b2.appendChild(b2text);
			var a2=document.createElement("a");
			a2.setAttribute("href","pro_detail.html");
			var txt2 = document.createTextNode(productList[i].name);
			a2.appendChild(txt2);
			p2.appendChild(b2);
			p2.appendChild(a2);
			div.appendChild(p2);

			
			//商品单价
			var p3 = document.createElement("p");
			var txt3 =document.createTextNode("¥"+(productList[i].price).toFixed(2));
			p3.appendChild(txt3);
			div.appendChild(p3);

			//商品数量
			var p4 = document.createElement("p");
			p4.setAttribute("class","count");
			var input1=document.createElement("input");
			input1.setAttribute("type","button");
			input1.setAttribute("value","-");
			input1.setAttribute("onclick","operProductNum(false,"+productList[i].id+")");
			var input2=document.createElement("input");
			input2.setAttribute("type","text");
			input2.setAttribute("value",productList[i].number);
			input2.setAttribute("id","proNum_"+productList[i].id);
			var input3=document.createElement("input");
			input3.setAttribute("type","button");
			input3.setAttribute("value","+");
			input3.setAttribute("onclick","operProductNum(true,"+productList[i].id+")");
			p4.appendChild(input1);
			p4.appendChild(input2);
			p4.appendChild(input3);
			div.appendChild(p4);
			
			//商品小计
			var p5 = document.createElement("p");
			p5.setAttribute("class","sum");
			var txt5 = document.createTextNode("¥"+(productList[i].number*productList[i].price).toFixed(2));
			p5.appendChild(txt5);
			div.appendChild(p5);
			
			//操作
			var p6 = document.createElement("p");
			p6.setAttribute("class","del");
			p6.setAttribute("onclick","delProduct("+productList[i].id+")");
			var txt6 = document.createTextNode("删除");
			p6.appendChild(txt6);
			div.appendChild(p6);
			//
			divbody.appendChild(div);
		}
		$('#allchecked2').addClass('hover');
		$('#allchecked1').addClass('hover');
 }
 //根据id删除对应的商品
 var delProduct = function(id){
 	//在进行删除的时候一定要提醒用户确认
 	if(confirm("亲，您确定要删除这个商品吗?")){
 		var div = document.getElementById("div_"+id);
 		//删除指定元素（删除div元素）
 		div.remove();
 		var carData = ShopCar.delProductById(id);
 		document.getElementById("totalNumber").innerHTML=carData.totalNumber;
		document.getElementById("totalAmount").innerHTML="￥"+carData.totalAmount;
 	}
 	var divcount = document.querySelectorAll(".bot").length;
 	if(divcount==0){
 		document.getElementById("achecked").style.display="none";
 		document.getElementById("allchecked1").setAttribute("class","");
 		document.getElementById("allchecked2").setAttribute("class","");
 	}
 }
 //全选和反选操作
 var checkboxSelect = function(){
 	var carData = ShopCar.getProductList(); 
 	var productList = carData.productList;
 	if($("#allchecked1").hasClass("hover")){
 		$("#allchecked1").removeClass("hover");
 		$("#allchecked2").removeClass("hover");
		$(".content .shopcar .shop_body p i").removeClass("hover");
		carData.totalNumber=parseInt(0);
 		carData.totalAmount=parseFloat(0).toFixed(2);
 	}
 	else{
 		var len=$(".content .shopcar .shop_body .bot p i").length;
 		if(len>0){
 			$("#allchecked1").addClass("hover");
 			$("#allchecked2").addClass("hover");
 			$(".content .shopcar .shop_body p i").addClass("hover");
 			carData.totalNumber =0,carData.totalAmount=0;
 			for(var i in productList){
 				var e=parseInt(productList[i].number);
 				carData.totalNumber = parseInt(carData.totalNumber)+parseInt(productList[i].number);
 				carData.totalAmount = (parseFloat(carData.totalAmount)+parseFloat(productList[i].price)*parseFloat(productList[i].number)).toFixed(2);
 			}
 		}

 	}
 	$("#totalNumber").text(carData.totalNumber);
 	$("#totalAmount").text("￥"+carData.totalAmount);
	ShopCar.addCar(carData);
 }
 //单行选中
 var Select=function(id){
 	var carData=ShopCar.getProductList();
 	var i=$("#div_"+id).find("i");
 	if(i.hasClass("hover")){
 		i.removeClass("hover");
 		$("#allchecked1").removeClass("hover");
 		$("#allchecked2").removeClass("hover");
 		$(".top").find("i").removeClass("hover");
 		var sums=$("#div_"+id+" .sum").text();
 		var sum=sums.split('¥')[1];
 		var count=$("#div_"+id).find("input[type='text']").val();
 		carData.totalNumber=parseInt(carData.totalNumber)-parseInt(count);
 		carData.totalAmount=(parseFloat(carData.totalAmount)-parseFloat(sum)).toFixed(2);
 	}
 	else{
 		i.addClass("hover");
 		var sums=$("#div_"+id+" .sum").text();
 		var sum=sums.split('¥')[1];
 		var count=$("#div_"+id).find("input[type='text']").val();
 		carData.totalNumber=parseInt(carData.totalNumber)+parseInt(count);
 		carData.totalAmount=(parseFloat(carData.totalAmount)+parseFloat(sum)).toFixed(2);
 	}

 	$("#totalNumber").text(carData.totalNumber);
 	$("#totalAmount").text("￥"+carData.totalAmount);
 	ShopCar.addCar(carData);
 }
 //排列删除操作
 var delProductList = function(){
 	var boxs = document.querySelectorAll("#check");
 	var pIdList = [];
 	for(var i =0;i<boxs.length;i++){
 		if(boxs[i].className=="hover"){
 			pIdList.push(boxs[i].getAttribute("value"));
 		}
 	}

 	if(pIdList.length<=0){
 		alert("请选择需要删除的商品!");
 		return;
 	}

 	if(confirm("您确定要删除这些商品吗?")){
	 	for (var i = 0; i < pIdList.length; i++) {
	 		document.getElementById("div_"+pIdList[i]).remove();
	 		var carData = ShopCar.delProductById(pIdList[i]);
	 		document.getElementById("totalNumber").innerHTML=carData.totalNumber;
			document.getElementById("totalAmount").innerHTML="￥"+carData.totalAmount;
	 	}
 	}
 	if(pIdList.length==boxs.length){
 		document.getElementById("achecked").style.display="none";
 		document.getElementById("allchecked1").setAttribute("class","");
 		document.getElementById("allchecked2").setAttribute("class","");
 	}
 }
 //操作加减
 var operProductNum = function(flag,id){
 	var num = document.getElementById("proNum_"+id);
 	var v = parseInt(num.value);
 	if(flag){
 		num.value = ++v;
 	}else{
 		if(v > 1){
 			num.value = --v;
 		}else{
 			return;
 		}
 	}
 	var carData =ShopCar.getProductList();
 	var productList = carData.productList;
 	var div_id=document.getElementById("div_"+id).firstChild.firstChild;
	for(var i=0;i<productList.length;i++){
		if(productList[i].id==id){
			if(div_id.className=="hover"){
	 		 	carData =ShopCar.updateProduct(id,num.value);
	 		 	ShopCar.addCar(carData);
		 	}
		 	else{
		 		productList[i].number=v;
		 		ShopCar.addCar(carData);
		 	}
		 	var thisid=document.getElementById("div_"+id).childNodes[4];
			var sum=v*parseInt(productList[i].price);
			thisid.innerHTML="¥"+sum.toFixed(2);
		 }
	}
	document.getElementById("totalNumber").innerHTML=carData.totalNumber;
	document.getElementById("totalAmount").innerHTML="￥"+carData.totalAmount;
 }
 window.onload=function(){
 	$(".header .title  p").eq(0).find("a").css({
		"background":"url('images/line3.png') no-repeat left center",
		"z-index":"3"
	})
	$(".header .title  p").eq(1).find("a").css({
		"background":"url('images/line4.png') no-repeat left center",
		"z-index":"2",
		"padding-left":"55px"
	})
	$(".header .title  p").eq(2).css({
		"width":"198px"
	})
	$(".header .title  p").eq(2).find("a").css({
		"background":"url('images/line5.png') no-repeat left center",
		"z-index":"1",
		"padding-left":"55px"
	})
 	productLoad();
 	if($(".bot").length==0){
 		$(".top").hide();
 		$("#totalNumber").text(0);
 		$("#totalAmount").text("￥0.00");
 	}
 }