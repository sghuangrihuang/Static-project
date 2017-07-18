// 控制器
angular.module('starter.controllers', [])
    //首页控制器
    .controller('HomelistCtrl', function($scope, $http, $ionicLoading, $timeout, $state) {
        //页面加载
        $scope.onread = (function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>',
                noBackdrop: false
            });
        })();
        $scope.show=false;
        //获取json数据
        $http.get("get.json").success(function(data) {
            $scope.homelists = data.homelists;
            $scope.homelists1 = data.homelists1;
            $scope.homelists2 = data.homelists2;
            $scope.homelists3 = data.homelists3;
            $ionicLoading.hide();
        });
        //搜索框
        $scope.showtime = function() {
            $state.go("prosearch");
            $timeout(function() {
                document.getElementById("search").focus();
            }, 500);
        };
        //下拉刷新内容
        $scope.loadMore = function() {
            if ($scope.homelists3.length <= 30) {
                $http.get("get.json").success(function(data) {
                    for (var i in data.homelists1) {
                        $scope.homelists3.push(data.homelists1[i]);
                    }
                }).finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                $scope.show=true;
            }
        };
    })
    //用户中心控制器
    .controller('UserlistCtrl', function($scope, $http, $stateParams) {
        $http.get("get.json").success(function(data) {
            $scope.userlists = data.userlists;
            if (data.userlists) {
                $scope.userlist = data.userlists[$stateParams.userlistId - 1];
            }
        });
    })
    //引导页控制器
    .controller("GuidelistCtrl", function($scope, $timeout, $http) {
        //获取当前屏幕的高度
        var bgh = document.documentElement.clientHeight;
        $scope.hei = {
            "height": bgh + 'px'
        };
        $http.get("get.json").success(function(data) {
            $scope.guidelist = data.guidelist;
        });
    })
    //搜索列表控制器
    .controller('SearchlistCtrl', function($scope, $http, $filter, $timeout) {

        $http.get("get.json").success(function(data) {
            $scope.searchlist = data.searchlist;
            $scope.prodata = function(search) {
                $scope.searchlist = [];
                $scope.searchlist = $filter('filter')(data.searchlist, {'text':search});
            };
        });
    })
    //购物车控制器
    .controller('CartlistCtrl', function($scope, $ionicActionSheet,  $ionicPopup, $filter, $http, $state, $location,$ionicModal, ShopCarService) {
        // 初始化数据
        $scope.getData = {};
        $scope.getData.show=false;
        //修改按钮模块
        $ionicModal.fromTemplateUrl("popover.html", {
            scope: $scope
        }).then(function(res) {
            $scope.modal = res;
        });
        // 存储修改模块当前索引
        $scope.getData.index = 0;
        //修改按钮模块显示
        $scope.modalshow = function(index) {
            $scope.getData.index = index;
            $scope.getData.newcount = $scope.getData.list[index].count;
            $scope.modal.show();
        };
        //修改按钮模块隐藏
        $scope.modalhide = function(newcount) {
            if (/^\d+$/.test(newcount) && newcount >= 1) {
                var index = $scope.getData.index;
                $scope.getData.list[index].count = newcount;
            } else {
                $ionicPopup.alert({
                    title: '错误信息',
                    template: '您输入的数量格式错误，请重新输入'
                });
                $scope.getData.newcount=1;
                return;
            }
            $scope.sum();
            $scope.modal.hide();
        };
        //清除模块
        $scope.closemodeal = function() {
            $scope.modal.hide();
        };
        //计算价格
        $scope.sum = function() {
            $scope.getData.allsum = 0;
            for (var i = 0, leng = $scope.getData.list.length; i < leng; i++) {
                if ($scope.getData.list[i].checked) {
                    $scope.getData.allsum += $scope.getData.list[i].count * $scope.getData.list[i].price;
                }
            }
            $scope.checked();
        };
        $scope.checked=function(){
            $scope.getData.allchecked=false;
            for (var i = 0, leng = $scope.getData.list.length; i < leng; i++) {
                if (!$scope.getData.list[i].checked) {
                    $scope.getData.allchecked=false;
                    return;
                }
                $scope.getData.allchecked=true;
            }
        };
        //单选中
        $scope.select = function() {
            $scope.sum();
        };
        //全选中
        $scope.allselect = function() {
            if($scope.getData.list instanceof Object){
                if($scope.getData.list.length===0){
                    $scope.getData.allchecked=false;
                    return;
                }
            }
            if($scope.getData.list===undefined){
                $scope.getData.allchecked=false;
                return;
            }
            for (var i = 0, leng = $scope.getData.list.length; i < leng; i++) {
                $scope.getData.list[i].checked = $scope.getData.allchecked;
            }
            $scope.sum();
        };
        //操作
        $scope.opea = function($index) {
            $ionicActionSheet.show({
                titleText: "操作",
                buttons: [{
                    "text": "修改"
                }],
                destructiveText: "删除",
                cancelText: "取消",
                cancel: function() {},
                // 确定
                buttonClicked: function() {
                    $scope.modalshow($index);
                    return true;
                },
                // 删除
                destructiveButtonClicked: function() {
                    $ionicPopup.show({
                        template:'您是否删除该产品',
                        title:'操作',
                        buttons:[{
                            text:'否'
                        },{
                            text:'是',
                            type: 'button-positive',
                            onTap:function(){
                                $scope.getData.list.splice($index, 1);
                                $scope.sum();
                                ShopCarService.updateShop($scope.getData);  
                                if(ShopCarService.islistEmpty()){
                                    $scope.getData.allchecked=false;
                                    ShopCarService.updateShop($scope.getData);
                                    $scope.getData.show=true;
                                }
                            }
                        }]
                    });
                    return true;
                }
            });
        };
        //链接
        $scope.hreflist = function(id) {
            $location.url("prodetail/"+id);
        };
        //分享
        $scope.share = function() {
            $ionicActionSheet.show({
                titleText: "<h4>分享连接</h4>",
                cancelText: "取消",
                buttons: [{
                    "text": "QQ"
                }, {
                    "text": "微信"
                }, {
                    "text": "微博"
                }],
                cancel: function() {},
                buttonClicked: function() {
                    return true;
                },
                destructiveButtonClicked: function() {
                    return true;
                }
            });
        };
        //付款方式选择
        $scope.choose = function(index) {
            var is = document.getElementsByClassName("iclick");
            if (!is) {
                return;
            }
            for (var i = 0; i < is.length; i++) {
                is[i].style.border = "1px solid #e82020";
                is[i].style.background = "none";
            }
            is[index].style.border = "none";
            is[index].style.background = "url('./img/hover.png') no-repeat center left";
        };
        //购物车链接
        $scope.hrefcart = function() {
            // 过滤未选中的
            $scope.getData.list = $filter('filter')($scope.getData.list,{checked:true});
            ShopCarService.updateShop($scope.getData);
            if(ShopCarService.islistEmpty()){
                $ionicPopup.alert({
                    title: '错误信息',
                    template: '您的购物车为空'
                });
                return;
            }
            $scope.getData.allchecked=true;
            ShopCarService.updateShop($scope.getData);
            $state.go('order');
        };
        //支付成功
        $scope.paysuccess=function(){
            ShopCarService.clearShop();
            $scope.getData.show = false;
            $scope.getData.allsum = 0;
            $ionicPopup.alert({
                title: '支付成功',
                template:'是否继续购物？',
                buttons:[{
                    text:'否',
                    onTap:function  (){
                        $state.go('app.homepage');
                    }
                },{
                    text:'是',
                    type: 'button-positive',
                    onTap:function(){
                        $state.go('prolist');
                    }
                }]
            });
        };
        $scope.$on("$ionicView.beforeEnter", function() {
            if (ShopCarService.isEmpty()||ShopCarService.islistEmpty()) {
                $scope.getData.show=true;
                return;
            }
            $scope.getData.allchecked = ShopCarService.getData().allchecked;
            $scope.getData.allsum = ShopCarService.getData().allsum;
            $scope.getData.list=ShopCarService.getData().productList;
            $scope.getData.show=false;
        });
    })
    //产品详情控制器
    .controller('DetaillistCtrl', function($scope, $stateParams, $state, $ionicActionSheet, $http, $ionicLoading, $timeout, ShopCarService) {
        $http.get("get.json").success(function(data) {
            if (data.detalist) {
                $scope.detaillist = data.detalist[$stateParams.detailid];
            }
        });
        //刷新过度
        $ionicLoading.show({
            template: '<ion-spinner icon="android" class="spinner spinner-android"></ion-spinner>',
            noBackdrop: false
        });
        //一秒后隐藏
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);

        //产品详情
        $scope.count = 1;
        //获得焦点 存储当前数量
        $scope.inputfocus = function(val) {
            $scope.cur = $scope.count;
        };
        //失去焦点  
        $scope.inputblur = function(val, $event) {
            $event.target.value = (isNaN(($scope.count = parseInt(val))) || (val < 1)) ? $scope.cur : $scope.count;
        };
        //按钮减
        $scope.reduce = function($event) {
            if ($scope.count <= 1) {
                $scope.count = 1;
            } else {
                $scope.count--;
            }
            $event.target.parentNode.childNodes[3].value = $scope.count;
        };
        //按钮加
        $scope.add = function($event) {
            if ($scope.count >= 99) {
                $scope.count = 99;
            } else {
                $scope.count++;
            }
            $event.target.parentNode.childNodes[3].value = $scope.count;
        };
        //选项按钮1
        $scope.a = function($event) {
            for (var i = 0; i < $event.target.parentNode.children.length; i++) {
                $event.target.parentNode.children[i].style.border = "1px solid #111010 ";
                $event.target.parentNode.children[i].style.color = "#111010";
            }
            $event.target.style.border = "1px solid #e82020";
            $event.target.style.color = "#e82020";
        };
        //选项按钮2
        $scope.b = function($event) {
            for (var i = 1; i < $event.target.parentNode.children.length; i++) {
                $event.target.parentNode.children[i].style.border = "1px solid #111010 ";
                $event.target.parentNode.children[i].style.color = "#111010";
            }
            $event.target.style.border = "1px solid #e82020";
            $event.target.style.color = "#e82020";
        };
        //分享
        $scope.share = function() {
            $ionicActionSheet.show({
                titleText: "<h4>分享连接</h4>",
                cancelText: "取消",
                buttons: [{
                    "text": "QQ"
                }, {
                    "text": "微信"
                }, {
                    "text": "微博"
                }],
                buttonClicked: function() {
                    return true;
                },
                destructiveButtonClicked: function() {
                    return true;
                }
            });
        };
        //加入购物车
        $scope.addshopcar = function() {
            var id = $stateParams.detailid;
            product[id].count = $scope.count;
            ShopCarService.addShop(product[id]);
        };
    })
    //分类列表控制器
    .controller('SortlistCtrl', function($scope, $http, $state, $timeout) {

        $http.get("get.json").success(function(data) {
            $scope.sortlist = data.sortlist;
            $scope.sortlist1 = data.sortlist1;
            $scope.sortlist2 = data.sortlist2;
            $scope.listlist = data.listlist;
        });
        var arrs = document.getElementsByClassName("listright");
        for (var i = 1; i < arrs.length; i++) {
            arrs[i].style.display = " none";
        }
        $scope.listselelct = function(index) {
            var ar = document.getElementsByClassName("leftlist");
            for (var i = 0; i < ar.length; i++) {
                ar[i].style.backgroundColor = "#e2e0de";
            }
            ar[index].style.backgroundColor = "#fff";
            var arr = document.getElementsByClassName("listright");
            for (var i = 0; i < arr.length; i++) {
                arr[i].style.display = " none";
            }
            arr[index].style.display = " block";
        };
        var arrss = document.getElementsByClassName("sortright");
        for (var i = 1; i < arrss.length; i++) {
            arrss[i].style.display = " none";
        }
        $scope.sortselect = function($index) {
            var ar = document.getElementsByClassName("listleft");
            for (var i = 0; i < ar.length; i++) {
                ar[i].style.backgroundColor = "#e2e0de";
            }
            ar[$index].style.backgroundColor = "#fff";
            var arr = document.getElementsByClassName("sortright");
            for (var i = 0; i < arr.length; i++) {
                arr[i].style.display = " none";
            }
            arr[$index].style.display = " block";
        };
        $scope.showtime = function() {
            $state.go("prosearch");
            $timeout(function() {
                document.getElementById("search").focus();
            }, 500);
        };
    });