$(function(){
	var shopcart = function (bool){
		//全选
		var _selectall = function(bool){
			var checkboxs= $(".tbody li  input[type='checkbox']");
			(bool) ? checkboxs.prop("checked",true) : checkboxs.prop("checked",false);
			_datafrech();
		}	
		//单选
		var _select = function(){
			var list = $(".tbody li");
			var checkedlist=[];
			for(var i=0;i<list.length;i++){
				var checked = list.eq(i).find("input[type='checkbox']").prop('checked');
				if(checked){
					checkedlist.push(checked);
				}
			}
			_datafrech();
			if(checkedlist.length===list.length){
				$(".tfail input[type='checkbox']").prop("checked",true);
				return;
			}
			$(".tfail").find("input[type='checkbox']").prop("checked",false);
		}
		//数据刷新
		var _datafrech=function(){
			var sum = 0;
			var list = $(".shopcart .tbody li");
			for(var i=0;i<list.length;i++){
				var checked = list.eq(i).find("input[type='checkbox']").prop('checked');
				if(checked){
					var price  = parseInt(list.eq(i).find('.price').text().split('￥')[1]);
					var count = parseInt(list.eq(i).find("input[type='text']").val());
					sum +=  price *  count;
				}
			}
			$(".shopcart .tfail .text p b").text("￥"+sum.toFixed(2));
		}
		//加
		var _add = 	function(){
			var count = $(this).next().val();
			count ++;
			$(this).next().val(count);
			_datafrech();
		}
		//减
		var _reduce= function(){
			var count = $(this).prev().val();
			if(count<=1){
				return;
			}
			count -- ;
			$(this).prev().val(count);
			_datafrech();
		}
		var currentcount;
		//失去焦点
		var _inputblur = function(){
			var val = $(this).val();
			$(this).val(_inputnewvalue(val));
			_datafrech();
		}
		//获得焦点
		var _inputfocus= function(){
			currentcount=$(this).val();
		}
		//input 
		var _inputnewvalue = function(val){
			return  ( isNaN( ( val =  parseInt( val ) ) ) || ( val < 1 ) ) ? currentcount : val;
		}
		//删除
		var _del = function(){
			if(confirm("是否删除该产品")){
				$(this).parents("li").remove();
				_datafrech();
			}
		}
		//排序删除
		var _alldel= function () {
			var  list = $(".tbody ul li").find("input[type='checkbox']");
			var alllist=  $(".tbody ul li");
			var  checklist = [];
			for (var i = 0 ; i < list.length ; i++) {
				if(list.eq(i).prop("checked")){
					checklist.push(i);
				}
			}
			if(checklist.length==0){
				alert("请选择删除产品");
				return;
			}
			if(confirm("是否删除该产品")){
				for ( var i = 0 ; i < checklist.length ; i++ ){
					alllist.eq(checklist[i]).remove();
				}
				if(checklist.length == alllist.length ){
					$(".body input[type='checkbox']").prop("checked",false);
				}
			}
			_datafrech();
		}

		return {
			init:function(){
				var checkedclick = function (obj){
					var checked = $(obj).prop("checked");
					eval("shopcart."+$(obj).attr("cmd")+"("+checked+")");
				}
				var delclick = function (obj) {
					eval("shopcart."+$(obj).attr("cmd")+"()");
				}
				$(".shopcart input[type='checkbox']").each(function() {
					$(this).on("click", function() {
						checkedclick(this);
					});
				});
				$(".alldel").each(function(){
					$(this).on("click", function() {
						delclick(this);
					});
				});
				$(".tbody input[type='button']").click(function() {
					($(this).attr("cmd")=="reduce") ?  _reduce.apply(this,[]) :  _add.apply(this,[]) ;
				})
				$(".del").click(function(){
					_del.apply(this,[]);
				})
				$(".tbody input[type='text']").on("blur",function(){
					_inputblur.apply(this,[]);
				})
				$(".tbody input[type='text']").on("focus",function(){
					_inputfocus.apply(this,[]);
				})
			},
			selectall:_selectall,
			select:_select,
			add:_add,
			reduce:_reduce,
			del:_del,
			alldel:_alldel,
		}
	}();
	shopcart.init();
})