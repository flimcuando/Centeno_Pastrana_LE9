/******************************************************************************************/
(function( $ ) {
	
	if(!$.HB ){
		$.HB = {};
	}
	
	
	
	function updateItem(btn, orderSN, itemId, isIncrease, isRemove){
		var amount = parseInt($(btn).parent().find(".item_qty").val());
		if(amount && !isRemove){
			if(isIncrease){
				amount = amount +1
			}else{
				if(amount > 0){
					amount = amount -1;
				}else{
					amount = 0;
				}
			}
		}else{
			amount = 0;
		}
		$.ajax({
			url : "/uc/updateOrder",
			data : {"orderSN":orderSN, "itemId" : itemId, "amount" : amount},
			type : "post",
			dataType : "json",
			beforeSend : function (){
				
			},
			complete : function (){
				
			},
			success : function(data){
				var quantity = data.orderItemView.quantity;
				if(quantity > 0){
					$(btn).parent().find(".item_qty").val(data.orderItemView.quantity);
					$(btn).parent().next("li").find(".item_amount").html(data.orderItemView.finalPrice);
				}else{
					$(btn).parents("ul.scart_c").remove();
				}
				
				$(".order_shipping_standard").html(data.shippingAddressView.standardPrice);
				$(".order_shipping_expedited").html(data.shippingAddressView.expeditedPrice);
				if(data.shippingAddressView.standardChecked){
					$("input[name='shippingMethod'][value='standard']").attr("checked", "checked");
				}else if(data.shippingAddressView.expeditedChecked){
					$("input[name='shippingMethod'][value='expedited']").attr("checked", "checked");
				}
				
				$(".order_sub_total").html(data.subTotal);
				$(".order_coupon_total").html("-" + data.coupon);
				$(".order_shipping_total").html(data.dePrice);
				$(".order_grand_total").html(data.grandTotal);
			}
			
		});
	}
	
	function applyCoupon (orderSN){
		var couponcode = $("#coupon_code").val();
		$.ajax({
			url : "/uc/applyCoupon",
			data : {"orderSN":orderSN, "couponcode" : couponcode},
			type : "post",
			dataType : "json",
			beforeSend : function (){
				
			},
			complete : function (){
				
			},
			success : function(data){
				if(data.success){
					$(".order_sub_total").html(data.subTotal);
					$(".order_coupon_total").html("-" + data.coupon);
					$(".order_shipping_total").html(data.dePrice);
					$(".order_grand_total").html(data.grandTotal);
					$("#coupon_code_err").html("Apply succesfully");
				}else{
					$("#coupon_code_err").html(data.msg);
				}
			}
			
		});
	}
	
	function applyShippingAddress(addressFld, orderSN, callback){
		var addressId = $(addressFld).val();
		$(".edit_usr_add").hide();
		$(addressFld).parent().find(".edit_usr_add").show();
		
		if(addressId){
			$.ajax({
				url : "/uc/applyShippingAddress",
				data : {"orderSN":orderSN, "addressId" : addressId},
				type : "post",
				dataType : "json",
				beforeSend : function (){
					
				},
				complete : function (){
					
				},
				success : function(data){
					$(".order_shipping_standard").html(data.shippingAddressView.standardPrice);
					$(".order_shipping_expedited").html(data.shippingAddressView.expeditedPrice);
					$("#Shipping_and_Delivery_block").show("normal");
					
					/*if(data.shippingAddressView.standardChecked){
						$("input[name='shippingMethod'][value='standard']").attr("checked", "checked");
					}else if(data.shippingAddressView.expeditedChecked){
						$("input[name='shippingMethod'][value='expedited']").attr("checked", "checked");
					}*/
					
					$(".order_sub_total").html(data.subTotal);
					$(".order_coupon_total").html("-" + data.coupon);
					$(".order_shipping_total").html(data.dePrice);
					$(".order_grand_total").html(data.grandTotal);
					
					if(callback){
						callback();
					}
				}
				
			});
		}
	}
	
	function applyShippingMethod(orderSN, shippingMethod){

		$.ajax({
			url : "/uc/applyShippingMethod",
			data : {"orderSN":orderSN, "shippingMethod" : shippingMethod},
			type : "post",
			dataType : "json",
			beforeSend : function (){
				
			},
			complete : function (){
				
			},
			success : function(data){
				if(data.success){
					$(".order_sub_total").html(data.subTotal);
					$(".order_coupon_total").html("-" + data.coupon);
					$(".order_shipping_total").html(data.dePrice);
					$(".order_grand_total").html(data.grandTotal);
				}
			}
			
		});
	
	}
	
	function applyMsg(orderSN){
		
		var msg = $("#order_msg").val();

		$.ajax({
			url : "/uc/applyMsg",
			data : {"orderSN":orderSN, "msg" : msg},
			type : "post",
			dataType : "json",
			beforeSend : function (){
				
			},
			complete : function (){
				
			},
			success : function(data){
				$("#order_msg_noti").html("Submit message successfully.");
			},
			error :function(){
				$("#order_msg_noti").html("Submit message failed.");
			}
			
		});
	
	}
	
	
	$.HB.updateItem = updateItem;
	$.HB.applyCoupon = applyCoupon;
	$.HB.applyShippingAddress = applyShippingAddress;
	$.HB.applyShippingMethod = applyShippingMethod;
	$.HB.applyMsg = applyMsg;
	
	
})( jq );