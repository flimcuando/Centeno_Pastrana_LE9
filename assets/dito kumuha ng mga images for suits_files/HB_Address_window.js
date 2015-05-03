/******************************************************************************************/
(function( $ ) {
	
	var AddressWindow = function(config){
		var defaultConfig = {
				title : "Address",
				contentUrl : false,
				width : "630",
				height : "400",
				modal : true,
				postUrl : false,
				success : function(){},
				error : function(){},
				closeWhenError : false,
				closeWhenSuccess : true
		};
		
		config = $.extend(defaultConfig, config);
		
		if(config.contentUrl && config.postUrl){
			$.ajax({
				url : config.contentUrl,
				dataType : "html",
				success : function(data){
					$("body #addressDialogDelegate").remove();
					$("body").append("<div id='addressDialogDelegate'></div>");
					$("#addressDialogDelegate").append(data);
					$("#addressDialogDelegate form").attr("action", config.postUrl)
					$("#addressDialogDelegate").dialog(config);
					
					$('#addressDialogDelegate form[name=address]').ajaxForm({
						
						beforeSubmit : function(){
							$('#addressDialogDelegate .ajax_loading').show();
						},
						
						success : function(){
							if(config.closeWhenSuccess){
								$("#addressDialogDelegate").remove();
							}
							config.success.apply(this, arguments);
						},
						error : function(){
							if(config.closeWhenError){
								$("#addressDialogDelegate").remove();
							}
							$('#addressDialogDelegate .ajax_loading').hide();
							config.error.apply(this, arguments);
						},
						
					});
				}
			});
		}else{
			alert("Have no contentUrl or postUrl configuration for address dialog");
		}
		
	};
	
	$.HB  = {};
	
	$.HB.AddressWindow = AddressWindow;
	
})( jQuery );