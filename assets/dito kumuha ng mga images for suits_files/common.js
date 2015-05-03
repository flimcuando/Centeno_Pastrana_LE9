var SP = new Object();

(
	function(shop,jq){
		
		function updateHTML(item,data){
			 var rs = data;
			  if(rs.itemQTY){
				  jq("#"+item+" .item_qty").val(rs.itemQTY);
			  }
			  
			  if(rs.itemAmount){
				  jq("#"+item+" .item_amount").html(rs.itemAmount);
			  }
			  
			  if(rs.subTotal){
				  jq(".order_sub_total").html(rs.subTotal);
			  }
			  
			  if(rs.coupon){
				  jq(".order_coupon_total").html(rs.coupon);
			  }
			  
			  if(rs.grandTotal){
				  jq(".order_grand_total").html(rs.grandTotal);
			  }
			  
			  if(rs.couponFeedbackSuc){
				  jq("#coupon_code_noti").html(rs.couponFeedbackSuc);
			  }
			  
			  
			  if(rs.couponFeedbackErr){
				  jq("#coupon_code_noti").html(rs.couponFeedbackErr);
			  }
			  
			  if(rs.itemID){
				  jq("#"+rs.itemID).hide("normal");
				  jq("#"+rs.itemID).remove();
			  }
			  
			  if(rs.itemCount && "0"!=rs.itemCount){
				  jq("span.items_num").html("(" + rs.itemCount+")");
			  }else{
				  window.location=window.location.toString();
			  }
		}
		
		shop.increaseCartItem = function(item){
			if(item){
				jq.ajax({
					 url: "/uc/updateShoppingCart?action=increaseItemToCart&item="+item+"&v="+ Math.random(),
					 dataType:"json",
					  success: function(data){
						  updateHTML(item,data);
					  }
				});
			}
		};
		
		
		shop.decreaseCartItem = function(item){
			if(item){
				jq.ajax({
					 url: "/uc/updateShoppingCart?action=decreaseItemToCart&item="+item+"&v="+ Math.random(),
					 dataType:"json",
					  success: function(data){
						  updateHTML(item,data);
					  }
				});
			}
		};
		
		shop.removeCartItem = function(item){
			if(item){
				jq.ajax({
					 url: "/uc/updateShoppingCart?action=removeItemToCart&item="+item+"&v="+ Math.random(),
					 dataType:"json",
					  success: function(data){
						  updateHTML(item,data);
					  }
				});
			}
		};
		

		shop.applyCoupon = function(item){
			if(item){
				jq("#submit_coupon").ajLoad();
				jq.ajax({
					 url: "/uc/updateShoppingCart?action=applyCoupon&couponID="+item+"&v="+ Math.random(),
					 dataType:"json",
					  success: function(data){
						  updateHTML(item,data);
						  jq("#submit_coupon").ajUnload();
					  }
				});
			}
		};
		
		shop.goToAddress = function(item){
			if(item){
				jq.ajax({
					 url: "/uc/updateShoppingCart?action=updateCustomerMsg&v="+ Math.random(),
					 dataType:"json",
					 type:'post',
					 data: "order_msg="+item,
					  success: function(rs){
						  jq("#GO_TO_Fill_Address").ajLoad();
						  
						  if(rs.orderMsg){
							  jq("#order_msg_noti").html(rs.orderMsg);
						  }else{
							  window.location="/uc/shoppingCart_address";
						  }
						  jq("#GO_TO_Fill_Address").ajUnload();
						  
					  }
				});
			}else{
				  window.location="/uc/shoppingCart_address";
			}
		};
		
		shop.changePayType = function(){
			jq(".shipping_desc").hide();
			
			var el = jq(".shipping_title input[checked=checked]");
			
			el.parent(".shipping_title").next(".shipping_desc").show();
		};
		
		shop.getShippingPrice = function(item,type){
			var el = jq(item);
			if(el.length>0){
				jq(el).ajLoad();
				var tp = 'standard';
				
				if(type && jq(type).length>0){
					tp = jq(type).val();
				}
				
				jq.ajax({
					 url: "/uc/retrieveShippingPrice?cc="+el.val()+"&shippingMethod="+tp+"&v="+ Math.random(),
					 dataType:"json",
					 type:'post',
					 data: "order_msg="+item,
					  success: function(rs){
						  if(rs.grandTotal){
							  jq(".order_grand_total").html(rs.grandTotal);
						  }
						  
						  if(rs.standard){
							  jq(".order_shipping_standard").html(rs.standard);
						  }
						  
						  if(rs.expedited){
							  jq(".order_shipping_expedited").html(rs.expedited);
						  }
						  
						  if(rs.shippingCost){
							  jq(".order_shipping_total").html(rs.shippingCost);
						  }

						  jq(el).ajUnload();
						  
					  }
				});
			}
		};
	}		

)(SP,jq);


(function(jq){
	
		jq.fn.ajLoad = function(){
			var el = jq(this);
			if(el && el.length > 0 ){
				el.next(".ajax_load").remove();
				el.after("<img src='/style/image/ajax_loader.gif' class='ajax_load'>");
			}
		};
		
		jq.fn.ajUnload = function(){
			var el = jq(this);
			if(el && el.length > 0 ){
				el.next(".ajax_load").remove();
			}
		};
		
		function createMaskElment(){
			
			var masker = jq("#mask_content");
			
			if(masker.length < 1){
				var content = "<div id=\"mask_content\" style=\"position:absolute;background:#000;filter:alpha(opacity=10);opacity:0.2;width:100%;left:0;top:0;z-index:400;border:none;cursor: wait;\"></div>"
				jq(content).appendTo("body");
				masker = jq("#mask_content");
			}
			
			var el = jq(masker);
			el.position(0,0);
			el.css({
				"position":"absolute",
				"background":"#000"
			});
			el.width(jq(document).width());
			el.height(jq(document).height());
			return masker;
		}
		
		jq.fn.mask = function(){
			var mask = createMaskElment();
			var el = jq(this);
			el.css({"position":"absolute"});
			el.css({"z-index":"411"});
			el.css({"float":"left"});
			el.position(0,0);
			el.show();
		};
		
		jq.fn.unmask = function(){
			jq("#mask_content").remove();
			var el = jq(this);
			el.hide();
		};
		
		jq.fn.slider = function(){
			var slider = jq(this);
			slider.show();
			slider.currentSlider = 0;
			slider.sliders = slider.find(".measure_panel");
			slider.controllers = slider.find(".measure_controller img");
			slider.buttons = slider.find(".measure_navigation .measure_buttons .button_01");
			slider.tips = slider.find(".measure_controller .circle_hint");
			
			function initButtons(){
				
				slider.buttons.show();
				
				slider.buttons.unbind();
				
				var currentSlider = slider.find(".measure_panel:visible");
				
				var currentSliderIndex = 0;
				
				if(currentSlider.length > 0){
					currentSliderIndex = slider.sliders.index(currentSlider);
				}
					
				if(slider.currentSlider < 1){
					slider.currentSlider = currentSliderIndex;
				}
				
				if(slider.currentSlider == 0){
					jq(slider.buttons.get(0)).hide();
				} 
				
				if(slider.currentSlider < slider.sliders.length-1){
					jq(slider.buttons.get(2)).hide();
				}
				
				if(slider.currentSlider >= slider.sliders.length-1){
					jq(slider.buttons.get(1)).hide();
				}
				
				
				jq(slider.buttons.get(0)).click(function(){
					slider.go(slider.currentSlider - 1);
				});
				
				jq(slider.buttons.get(1)).click(function(){
					slider.go(slider.currentSlider + 1);
				});
				
				jq(slider.buttons.get(3)).click(function(){
					slider.hide();
					jq.documentUMask();
				});
			}
			
			initButtons();
			
			slider.go = function(index){
				if(index != slider.currentSlider){
					if(jq(slider.sliders.get(slider.currentSlider)).fieldCheck()){
						slider.currentSlider = index;
						slider.sliders.hide();
						jq(slider.sliders.get(slider.currentSlider)).fadeIn("slow");
						slider.controllers.removeClass("pagination_active_m");
						slider.controllers.addClass("pagination_m");
						jq(slider.controllers.get(slider.currentSlider)).removeClass("pagination_m");
						jq(slider.controllers.get(slider.currentSlider)).addClass("pagination_active_m");
					}
				}
				initButtons();
			};
			
			slider.cycle = function(){
				setInterval(function(){
					if(slider.sliders.length - 1 > slider.currentSlider){
						slider.go(slider.currentSlider +1);
					}else{
						slider.go(0);
					}
				},5000);
			}
			
			slider.controllers.each(function(index){
				jq(slider.controllers.get(index)).click(function(){
					slider.go(index);
				});
				
				/*jq(slider.controllers.get(index)).mouseover(function(e){
					slider.tips.html(jq(this).attr("title"));
					slider.tips.show();
					slider.tips.offset({top:e.pageY - 37 ,left:e.pageX - 90});
				});
				
				jq(slider.controllers.get(index)).mouseout(function(){
					slider.tips.hide();
				});*/
			});
			
			return slider;
		};
		
		

		jq.extend({
			documentMask : function(options) {
				var op = jq.extend({
					opacity : 0.8,
					z : 10000,
					bgcolor : '#000'
				}, options);
	
				jq('<div class="jquery_addmask"> </div>').appendTo(document.body)
						.css({
							position : 'absolute',
							top : '0px',
							left : '0px',
							'z-index' : op.z,
							width : jq(document).width(),
							height : jq(document).height(),
							'background-color' : op.bgcolor,
							opacity : 0,
							cursor: "wait"
						}).fadeIn('slow', function() {
							jq(this).fadeTo('slow', op.opacity);
						})/*.click(function() {
							jq(this).fadeTo('slow', 0, function() {
								jq(this).remove();
							});
						})*/;
	
				return this;
			}
		}); 
		
		jq.extend({
			documentUMask : function(){
				jq(".jquery_addmask").remove();
			}
		});
		
		jq.fn.checkableGroup = function(){
			var el = jq(this);
			var group = el.attr("checkableGroup");
			var value = el.attr("value");
			var target = el.attr("target");
			
			if(target.val == el.attr("value")){
				if(el.next("h3").length > 0){
					jq("[checkableGroup="+group+"]").next("h3").removeClass("current");
					el.next("h3").addClass("current");
				}else{
					jq("[checkableGroup="+group+"]").removeClass("current");
					el.addClass("current");
				}
			}
			
			el.mouseover(function(){
					if(jq("[checkableGroup="+group+"]").next("h3").length > 0){
						jq("[checkableGroup="+group+"]").next("h3").removeClass("active");
					}else{
						jq("[checkableGroup="+group+"]").removeClass("active");
					}
					
					if(el.next("h3").length > 0){
						jq("[checkableGroup="+group+"]").next("h3").removeClass("active");
						el.next("h3").addClass("active");
					}else{
						el.removeClass("active");
						el.addClass("active");
					}
			});
			
			el.mouseout(function(){
				if(el.next("h3").length > 0){
					jq("[checkableGroup="+group+"]").next("h3").removeClass("active");
				}else{
					el.removeClass("active");
				}
			});
			
			el.click(function(){
				jq("#"+target).val(value);
				if(el.next("h3").length > 0){
					jq("[checkableGroup="+group+"]").next("h3").removeClass("current");
					el.next("h3").addClass("current");
				}else{
					jq("[checkableGroup="+group+"]").removeClass("current");
					el.addClass("current");
				}
			});
		}
	}
)(jq);

jq("#header_top").ready(function() {
	jq(".user_menu>ul>li").mouseenter(function(){
		jq(this).removeClass("current");
		jq(this).addClass("current");
		jq(this).children(".user_menu_hidd").show();
	});
	
	jq(".user_menu>ul>li").mouseleave(function(){
		jq(this).removeClass("current");
		jq(this).children(".user_menu_hidd").hide();
	});
});

jq("#main_menu").ready(function() {
	jq(".main_menu>ul>li").each(function(index,data){
		var left = jq(data).offset().left;
		var width = jq(data).width();
		var leftMargin = jq("#main_menu").offset().left;
		if((left - leftMargin)  > 516){
			jq(data).children(".sub_menu").offset({ top: 40, left: - (516 - width + 90) });
			
		}else if((left - leftMargin)  > 456){
			jq(data).children(".sub_menu").offset({ top: 40, left: - (456 - width + 90) });
		}
		
	});
	
	jq(".main_menu>ul>li").mouseenter(function(){
		jq(this).removeClass("nav_on");
		jq(this).addClass("nav_on");
		
		jq(this).children(".sub_menu").show();
		
	});
	
	jq(".main_menu>ul>li").mouseleave(function(){
		jq(this).removeClass("nav_on");
		jq(this).children(".sub_menu").hide();
	});
});



jq("#main_box").ready(function() {
	jq(this).find("input,select,textarea").each(function(idx,el){
		var target = jq(el);
		target.focus(function(){
			var name = target.attr("name");
			if(name){
				jq("#"+name+"_noti").html("");
			}
		});
		
		target.blur(function(){
			var name = target.attr("name");
			var validation = target.attr("validation");
			
			var value = target.val();
			
			if(value){
				value = (value + "").trim();
				 target.val(value);
			}
			
			if(name && validation){
				
				if(!value || value.length <1){
					jq("#"+name+"_noti").html("Missing required field");
				}
				
				if(!value || value.length > 200){
					jq("#"+name+"_noti").html("Missing required field");
				}
				
				if("country" == validation){
					if(!value || value.length <1 || value == '0'){
						jq("#"+name+"_noti").html("Please select a country");
					}
				}
				
				if("is_email_exist" == validation){
					if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(value)){
						jq("#"+name+"_noti").html("Invalid email");
					}else{
						jq.ajax({
							 url: "/uc/checkUserEmail?RegEmail="+value+"&v="+ Math.random(),
							 dataType:"text",
							  success: function(data){
								  if("1"==data){
									  jq("#"+name+"_noti").html("Account exist");
								  }
							  }
						});
					}
				}
			}
		});
	});
	
	
	var billingAsPrimary = jq("#billingAddress_check_box").attr('checked');
	
	if("checked" == billingAsPrimary){
		jq("#billingAddress_content").hide();
		jq("#billingAddress_content_2").show();
	}else{
		jq("#billingAddress_content, #billingAddress_content_2").show();
		jq("#billingAddress_content_2").hide();
	}
	
	jq("#billingAddress_check_box").click(function(){
		var value = jq(this).attr('checked');
		if("checked" == value){
			jq("#billingAddress_content").hide();
			jq("#billingAddress_content_2").show();
		}else{
			jq("#billingAddress_content, #billingAddress_content_2").show();
			jq("#billingAddress_content_2").hide();
		}
	});
	
	
	SP.changePayType();
	
	jq(".shipping_title input").click(function(){
		jq(".shipping_desc").hide();
		jq(this).parent(".shipping_title").next(".shipping_desc").show();
	});
	
});

jq("#promotions-tab").ready(function() {
	var currentTab = jq("#promotions-tab>h3").first("h3");
	jq("#promotions-tab>h3").mouseover(function(){
		currentTab.removeClass("link-now");
		jq("#" + currentTab.attr("aim")).hide();
		jq(this).addClass("link-now");
		jq("#" + jq(this).attr("aim")).show();
		currentTab = jq(this);
	});
	
});

(function($){
	$.fn.tanCeng = function(action,method,outDocument_id,background){
		if(method=='show')
		{			
			this.bind(action,function(){dod();});					
		}
		if(method=='absolute')
		{			
			dod();				
		}
		function dod(){
				var z_index=900;							 
				if(background!==1)$("#musicwhp_backgroundDiv").css({"opacity":"0.5","height":$(document).height(),"width":"100%","z-index":z_index,"background-color":"#333333","position":"absolute","top":"0px" , "left":"0px"}).show();
				var windowWidth = jq(window).width();
				var windowHeight = jq(window).height();
				var divWidth = jq("#Customfloat").width();
				var divHeight = jq("#Customfloat").height();			
				var divLeft = windowWidth/2-divWidth/2;			 
				var divTop = divHeight>windowHeight?50+jq(window).scrollTop():windowHeight/2-divHeight/2+jq(window).scrollTop();	
				divLeft = divLeft-200; 
				divTop = divTop -200;		
				jq(outDocument_id).css({"position":"absolute","z-index":++z_index,"top":divTop,"left":divLeft}).show();				
		}		
		if(method=='hide'){ this.bind(action,function(){ if($(outDocument_id).get(0).style.display!='none')$(outDocument_id+",#musicwhp_backgroundDiv").hide();});}				
		return this;
	}
	
	$.fn.bgiframe=($.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)? function(s) {
		s=$.extend({
			top:'auto',
			left:'auto',
			width:'auto',
			height:'auto',
			opacity:true,
			src:'javascript:false;'
		},s);
		var a='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';
		return this.each( function() {
			if($(this).children('iframe.bgiframe').length===0)
				this.insertBefore(document.createElement(a),this.firstChild)
		})
	}: function() {
		return this
	});
$.fn.bgIframe=$.fn.bgiframe;
})(jQuery);

jq(function(){
	jq("a[rel=thing_item_pics]").fancybox({
		'overlayColor'		: '#000',
		'overlayOpacity'	: 0.2,
		'speedIn'			: 400,
		'speedOut'			: 100,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'fade',
		'titlePosition' 	: 'inside',
		'titleShow'			:false
	});
	jq("a[rel=wholesale_pics]").fancybox({
		'overlayColor'		: '#000',
		'overlayOpacity'	: 0.2,
		'speedIn'			: 400,
		'speedOut'			: 100,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'fade',
		'titlePosition' 	: 'inside',
		'titleShow'			:false
	});
		var href;
		href = jq("#imageNormalBox").attr("val");
		//alert(href);
		jq("#linkNormalBox").attr("href",href);
		jq('.smallPic').click(function(){
		var imgSrc;
		var sNum;
			imgSrc = jq(this).attr("val");
			jq("#imageNormalBox").attr("src",imgSrc).parent("a").attr("href",imgSrc);
			sNum = jq(".smallPic").index(jq(this));
			jq(".noneBox").attr("rel","thing_item_pics")
			jq(".noneBox:eq("+sNum+")").removeAttr("rel");
		})
})

jq("#suitOpts").ready(function(){
	jq(this).find("[checkableGroup]").each(function(index,el){
		jq(el).checkableGroup();
	});
});

jq(".product-relates").ready(function(){
	
	jq("ul.related-products li input[type='checkbox']").each(function(index,el){
		
		jq(el).click(function(){
			
			var cc = jq(this).parent().prev().html().trim().split(" ")[0]
			var m = parseFloat(jq(this).parent().prev().html().trim().split(" ")[1]);
			
			var total = parseFloat(jq("#related_product_sum_total_price").html().trim().split(" ")[1]); 
			
			if(jq(this).attr("checked")){
				jq(this).parent().parent().addClass("selected").removeClass("unselected");
				jq("#related_product_sum_total_price").html(cc +" " + parseInt((total+m)*100)/100)
			}else{
				jq(this).parent().parent().addClass("unselected").removeClass("selected");
				jq("#related_product_sum_total_price").html(cc +" " + parseInt((total-m)*100)/100)
			}
			
		});
		
	});
	
	
});

(function( $ ) {

	// START DefaultValue
	// Default Value for input or textarea
	jQuery.fn.defaultValue = function() {
		
		this.each(function( i, o ) {
			var obj = $( o );
			
			if( /^(textarea|input)$/i.test( obj.attr( 'tagName' ) ) && !obj.data( 'tipsObj' ) ) {
				// Add a element
				var tips = document.createElement( 'div' );
				tips.innerHTML = obj.val();
				
				obj.after( tips );
					
				var objTips = $( tips );
				
				// Set style
				objTips.css({
					'color'		: '#999',
					'padding'	: '6px',
					'position'	: 'absolute',
					'font-size'	: '11px',
					'z-index'	: 1,
					'left'		: obj.position().left,
					'top'		: obj.position().top,
					'width'		: obj.outerWidth() - 6,
					'height'	: obj.outerHeight() - 6
				});
				
				// Clear the input/textarea value
				obj.val( '' );
				
				// Add data
				obj.data( 'tips', objTips );
				objTips.data( 'obj', obj ) 
				
				// Bind the events
				objTips.mousedown(function() {
					$( this ).fadeOut( 200, function(){
						objTips.data( 'obj' ).focus();
					});
				});
				
				obj.focus(function() {
					var self = this;
					objTips.fadeOut( 200, function(){
						self.focus();
					});
				});
				
				obj.blur(function() {
					if( $.trim( $( this ).val() ) != '' ) return;
					
					if( $( this ).data( 'tips' ).is(':hidden') ) {
						
						$( this ).data( 'tips' ).css({
							'left'	: obj.position().left,
							'top'	: obj.position().top
						});
						
						$( this ).data( 'tips' ).fadeIn( 200 );
					}
				});
			}
			
		});
	};
	// END DefaultValue


})( jQuery );

(function($){
	$('.product-info').ready(function(){
		$('#likeBtn').click(function(){
			var storage = window.localStorage;
			var name = $('#likeBtn').attr('name');
			if (storage.getItem(name+'_clickedLike')) {
				alert('You have already liked this!')
			} else {
				storage.setItem(name+'_clickedLike', true);
				$.post("/q/cmd/like", {pName:name} ,function(rs){
					$('#likeBtn').html(rs);
				});
			}
		});
	});
})(jq);

jQuery( ".product-shopping" ).ready(function() {
	jQuery("#CustomizedHidden").attr("name","");
	jQuery("#alert_thing_box_customizedsize").hide();
	
	jQuery( '.jq_default_value' ).defaultValue();
	
	jQuery( "select[name^='text@Size']" ).change(function(){
		if("Customized"==jQuery(this).val()){
			jQuery("#alert_thing_box_customizedsize").show("normal");
		}else{
			jQuery("#CustomizedSizeDesp").html("");
			jQuery("#CustomizedHidden").attr("name","");
			jQuery("#CustomizedHidden").val("");
		}
	});
	
	jQuery( '#alert_thing_box_customizedsize_submit' ).click(function(){
		
		var customizes = jQuery("input[id^='Customszie'], textarea[id^='Customszie']");
		
		var sizes = new Array();
		var unit = jQuery("#customizeUnit").val();
		
		for(var index =0 ; index< customizes.length ; index++){
			var value = jQuery(customizes[index]).val();
			if(parseInt(value) || "CustomszieSpecial"==jQuery(customizes[index]).attr("id")){
				sizes[index] = new Object();
				sizes[index].key = jQuery(customizes[index]).attr("name");
				sizes[index].value = value;
				jQuery(customizes[index]).siblings("span[id^='cussize']").hide();
			}else{
				jQuery(customizes[index]).siblings("span[id^='cussize']").show();
				return;
			}
		}
		
		
		
		var html = createCustomized(sizes,unit);
		
		jQuery("#CustomizedSizeDesp").html(html);
		jQuery("#CustomizedHidden").attr("name","text@Customized Size");
		jQuery("#CustomizedHidden").val(html);
		jQuery("#CustomizedSizeDesp").show();
		
		jQuery("#alert_thing_box_customizedsize").hide();
	});
	
	jQuery( '#alert_thing_box_customizedsize_cancel' ).click(function(){
		jQuery("#alert_thing_box_customizedsize").hide();
	});
	
	jQuery( "select[name^='text@']" ).each(function(index, el){
		jQuery(el).change(function(){
			var selector = jQuery(this);
			var itemFeild =  jQuery("input[name='optItem@"+selector.attr("name") + "']");
			var value = selector.val();
			var itemId = selector.find("option[value='"+value+"']").attr("data-opt-item");
			
			itemFeild.value=itemFeild.val(itemId);
		});
	});
	
});


function createCustomized(sizes, unit){
	if(!sizes || sizes.length < 1){
		return null;
	}
	var template = "<table><tbody>"
	for(var i = 0; i<sizes.length ; i++){
		var u = "";
		if(parseInt(sizes[i].value)){
			u = unit;
		}
		template = template + "<tr><td>"+sizes[i].key+"</td>"+"<td><span>"+sizes[i].value+"</span></td>"
				+"<td><span>"+u+"</span></td>"
				+"</tr>"
	}
	template = template + "</tbody></table>";
	
	return template;
}

function checkItem(){
	
	var color = jQuery("input[name^='color@Color']").val();
	
	if((null==color || color.length < 1)&&jQuery("#productColorSelector").length>0){
		alert("Please select a Color");
		return false;
	}
	
	var count = jQuery( "select[name^='text@']" ).length;
	
	if(count > 0){
		for(var i = 0 ;i < count ; i++){
			var name = jQuery(jQuery( "select[name^='text@']" )[i]).attr("name");
			var value = jQuery(jQuery( "select[name^='text@']" )[i]).val();
			if(name.split("@").length > 1){
				name = name.split("@")[1];
			}
			if(null==value || value.length < 1){
				alert("Please select an item from " + name);
				return false;
			}
		}
	}
	
	return true;
}


/*************************************Manager Address***************************************************/

function deleteUserShippingAddress(btn, addId){
	jQuery.ajax({
		url : "/uc/deleteUserShippingAddress?id="+addId,
		success : function(data){
			window.location.reload();
		},
		error : function(){
			alert("failed");
		}
	});
}

function editUserShippingAddress(btn, addId){
	jQuery.HB.AddressWindow(
			{contentUrl:"/uc/listAddress?id="+addId, 
				postUrl:"/uc/addOrUpdateShippingAddress?id="+addId, 
				title:"Edit Shipping Address",
				success : function(data){
					window.location.reload();
					//jQuery("#user_shipping_address").append(data);
				},
				error : function (data){
					alert('Failed');
				}
			});
}

function editUserBillingAddress(btn, addId){
	jQuery.HB.AddressWindow(
			{contentUrl:"/uc/listAddress?id="+addId, 
				postUrl:"/uc/addOrUpdateBillingAddress?id="+addId, 
				title:"Edit Billing Address",
				success : function(data){
					window.location.reload();
					//jQuery("#user_shipping_address").append(data);
				},
				error : function (data){
					alert('Failed');
				}
			});
}



