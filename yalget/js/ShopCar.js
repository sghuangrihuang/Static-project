/**
 * 专门定义购物车的代码类
 */
/**
 * 商品模版类
 */
var product = {
	id: 0,
	name: "",
	price: 0,
	number: 0,
	img: ""
};
/**
 * 购物车类
 */
var ShopCar = {
	/**
	 * 常量标识购物车的key
	 */
	SHOP_CAR: "SHOP_CAR",
	/**
	 * 添加商品到购物车
	 */
	addCar: function(carData) {
		localStorage.setItem(this.SHOP_CAR, JSON.stringify(carData));
	},
	/** 
	 * 获取购物车
	 */
	getCar: function() {
		return localStorage.getItem(this.SHOP_CAR);
	},
	/**
	 * 是否包含购物车对象
	 */
	isEmpty: function() {
		if (localStorage.getItem(this.SHOP_CAR)) {
			return true;
		}
		return false;
	},
	/**
	 * 清空购物车商品
	 */
	clearCar: function() {
		if (this.isEmpty()) {
			localStorage.removeItem(this.SHOP_CAR);
		}
	},

	/** 
	 * 添加商品函数 
	 */
	addProduct: function(product) {
		//第一次添加商品到购物车
		var shopCar = this.getCar();
		//如果购物车是第一次放商品，那么购物车肯定是null的
		if (!shopCar) {
			//购物车中商品的信息
			//toFixed(2) 进行金额小数点后多少位设置，2表示小数点后显示2位
			var carData = {
					productList: [product],
					totalNumber: product.number,
					totalAmount: (product.number * product.price).toFixed(2)
				}
				//商品不存在
			this.addCar(carData);
		} else {
			//购物车存在（因为存储到localStorage中的数据是字符串，所以需要通过JSON.parse()将原来的数据转换成JSON对象）
			var carData = JSON.parse(shopCar);
			//获取JSON对象中的商品集合对象
			var productList = carData.productList;
			var flag = false;
			//进行循环遍历判断，现在需要添加的商品是否在购物车中已经存在
			for (var i in productList) {

				if (product.id == productList[i].id) {
					//进行商品数量的添加
					productList[i].number += product.number;
					//是一个标记，如果为true表示购物车中存在该商品
					//如果是false表示购物车中不存在
					flag = true;
					break;
				}
			}
			//如果是false表示购物车中不存在
			if (!flag) {
				//直接将商品添加到购物车中
				productList.push(product);
			}
			//累加商品总数
			carData.totalNumber += product.number;
			//累计商品总金额
			var amount = (product.number * product.price) + parseFloat(carData.totalAmount);
			carData.totalAmount = parseFloat(amount).toFixed(2);
			//添加数据到购物车中
			this.addCar(carData);
		}
	},
	
	updateProduct:function(id,num){
		var shopCar = this.getCar();
		var carData = JSON.parse(shopCar);
		var productList = carData.productList;
		for (var i = 0; i < productList.length; i++) {	
			if (id == productList[i].id) {
				carData.totalNumber = carData.totalNumber + (num-productList[i].number);
				var ta = parseFloat(carData.totalAmount) + (num*parseFloat(productList[i].price))-(productList[i].number * parseFloat(productList[i].price));
				carData.totalAmount = ta.toFixed(2);
				productList[i].number = num;
				this.addCar(carData);
			}
		}
		return carData;
	},
	
	/**
	 * 获取购物车中的全部商品
	 */
	getProductList: function() {
		var shopCar = this.getCar();
		var carData = JSON.parse(shopCar);
		return carData;
	},
	/**
	 * 根据给定的商品id获取购物车中对应的商品
	 */
	getProductById: function(id) {
		var carData = JSON.parse(shopCar);
		//获取JSON对象中的商品集合对象
		var productList = carData.productList;
		var flag = false;
		//进行循环遍历判断，现在需要添加的商品是否在购物车中已经存在
		for (var i in productList) {
			if (id == productList[i].id) {
				return productList[i]
			}
		}
	},

	/**
	 * 根据给定的商品id从购物车中删除对应的商品
	 */
	delProductById: function(id) {
		var shopCar = this.getCar();
		var carData = JSON.parse(shopCar);
		//获取JSON对象中的商品集合对象
		var productList = carData.productList;
		var flag = false;
		//进行循环遍历判断，现在需要添加的商品是否在购物车中已经存在
		//创建一个新的数组，为接收原来的数组
		var newList = [];
		for(var i = 0;i<productList.length;i++){
			if (id == productList[i].id) {
				//将id等于要删除的商品的数量和总金额减掉
				//减商品总数
				carData.totalNumber -= productList[i].number;
				//减商品总金额
				var amount = parseFloat(carData.totalAmount)-(productList[i].number * productList[i].price);
				carData.totalAmount = parseFloat(amount).toFixed(2);
			}else{
				//将id不等于要删除的商品添加到新数组中
				newList.push(productList[i]);
			}
		}
		carData.productList=newList;
		this.addCar(carData);
		return carData;
	},

	/**
	 * 清空购物车中的所有商品
	 */
	clearShopCar: function() {
		this.clearCar();
	}
}