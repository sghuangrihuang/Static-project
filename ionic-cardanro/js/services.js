// 服务
angular.module('starter.services', [])
    //本地存储服务
    .factory('localStorageService', function() {
        return {
            // 初始化
            init: function(key) {
                if (localStorage.getItem(key)) {
                    return;
                }
                localStorage.setItem(key,angular.toJson(''));
            },
            get: function(key) {
                var value = localStorage.getItem(key);
                return angular.fromJson(value);
            },
            //更新
            update: function(key, value) {
                localStorage.setItem(key, angular.toJson(value));
            },
            //清空
            clear: function(key) {
                localStorage.removeItem(key);
            }
        };
    })
    .factory('ShopCarService', ['localStorageService', function(localStorageService) {
        return {
            key: 'RiShopCart',
            // 初始化
            init: function() {
                var ProductsData = {
                    productList: [],
                    allsum: 0,
                    allchecked: false
                };
                localStorageService.update(this.key, ProductsData);
            },
            // 购物车对象是否为空
            isEmpty: function() {
                if (localStorageService.get(this.key)) {
                    return false;
                }
                return true;
            },
            // 购物车产品数组是否为空
            islistEmpty:function(){
                var carData=localStorageService.get(this.key);
                if(carData.productList instanceof Object){
                    if(carData.productList.length==0){
                        return true;
                    }
                }
                if(carData.productList===undefined){
                    this.init();
                    return true;
                }
                return false;
            },
            //获得数据
            getData: function() {
                return localStorageService.get(this.key);
            },
            // 更新购物车
            updateShop: function(getData) {
                var ProductsData = {
                    productList: getData.list,
                    allsum: getData.allsum,
                    allchecked: getData.allchecked
                };
                localStorageService.update(this.key, ProductsData);
            },
            // 添加到购物车
            addShop: function(product) {
                var shopCar = localStorageService.get(this.key);
                if (!shopCar) {
                    var ProductsData = {
                        productList: [product],
                        allsum: 0,
                        allchecked: false 
                    };
                    localStorageService.update(this.key, ProductsData);
                } else {
                    var carData = angular.fromJson(shopCar);
                    var productList = carData.productList;
                    var flag = false;
                    for (var i in productList) {

                        if (product.id == productList[i].id) {
                            productList[i].count = parseInt(product.count) + parseInt(productList[i].count);
                            flag = true;
                            break;
                        }

                    }
                    if (!flag) {
                        productList.push(product);
                    }

                    localStorageService.update(this.key, carData);
                }
            },
            //删除购物车
            clearShop: function() {
                this.init();
            }
        };
    }])