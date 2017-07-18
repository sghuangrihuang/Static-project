// 过滤器
angular.module('starter.filters', [])
.filter("myfilter",function() {
	return function(str){
		return (str==="" || str==undefined) ? "¥0" : "¥"+str;
	};
});