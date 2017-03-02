(function($){

	function loadData(){
		var dfd=$.Deferred();

		$.ajax({
			"url":"https://jsonplaceholder.typicode.com/users",
			"dataType" :"json",
			"cache":false,
			success:function(data){dfd.resolve(data)},
			error:function(data){dfd.reject(data)}
		});

		return dfd.promise();
	}


	function renderStage(ul,datas,idx){

		ul.fadeOut(200).queue(function(next){
			

			$.each(datas,function(i,value){
				
				if($.trim(value.id)!=idx)
				{
					return true;
				}
				var elem = ul.find("li");

				elem.eq(0).find("span:eq(1)").text(value.name);
				elem.eq(1).find("span:eq(1)").text(value.username);
				elem.eq(2).find("span:eq(1)").text(value.email);
				elem.eq(3).find("span:eq(1)").text(value.phone);

				next();

			});

		}).fadeIn(200);
	}


	function renderList(ul,datas)
	{
		ul.empty();

		$.each(datas,function(i,value){

			$("<li></li>",{
				"data-id":value.id,
				"text":value.name
			}).appendTo(ul);

		});
	}


	$(document).ready(function(){

		var list=$("nav ul"),
			button=$("nav button"),
			stage=$(".showtemplate"),
			datas=undefined;



		list.on("click","li",function(){
			datas= datas||loadData();

			var that=this;

			datas.done(function(data){

				renderStage(stage,data,$(that).data("id"));

			});

		});



		button.on("click",function(){


			datas= datas||loadData();

			datas.done(function(data){

				renderList(list,data);

			});
			

		});
	});

})(jQuery);