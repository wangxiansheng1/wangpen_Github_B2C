define('lehu.h5.component.chants', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
 		'lehu.utils.busizutil',
 		'text!template_components_chants'
	],
 	function($, can, LHConfig, util, LHAPI, LHHybrid, busizutil, template_components_chants) {
		'use strict';
		return can.Control.extend({
			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				var that = this;
				this.initData();
				var renderList = can.mustache(template_components_chants);
				var html = renderList(this.options);
				that.element.html(html);
				that.getchantsData.apply(that);
			},
			initData: function() {
				this.param = {};
				this.param = can.deparam(window.location.search.substr(1));
			 	this.URL = LHHybrid.getUrl();
			},
			//用户端
			getchantsData: function() {
			 	var that = this;
				var MerchantCode = localStorage.getItem("MerchantCode");
			 	var api = new LHAPI({
					url: "http://app.lehumall.com/queryInfoForleague.do",
					data: {
						  merchantCode : MerchantCode
					},
					method: "post"
				});
				api.sendRequest()
					.done(function(data) {
						//console.log(data);
						var dataLength = data.data.length;
						var html = "";
						for(var i = 0; i < dataLength; i++) {
							var goodsList = data.data[i];
							html += "<a href = 'http://app.lehumall.com/html5/activity/yylm/union.html?goodsId=" + goodsList.GOODS_ID + "'><li class='chants_coupon_list'><div class='chants_coupon_car'><img src=' " + that.URL.IMAGE_URL + goodsList.GOODS_IMG + "'></div>";
							html += "<div class='chants_coupon_title' data-goods" + goodsList.GOODS_ID + "><h3 class='coupon_title_name'>" + goodsList.GOODS_NAME + "</h3><span class='coupon_title_carname'>" + goodsList.MERCHANT_NAME + "</span><p class='coupon_title_fuwu'>" + goodsList.GOODS_DESCRIBE + "</p><span class='coupon_title_val'>" + goodsList.EXCHANGE_VALUE + "&nbsp;积分</span></div></li></a>";
						}
						$('.chants_coupon').empty().append(html);
 					})
					.fail(function(error) {
						util.tip("数据错误，请重新进入！", 2000);
					});
			},
	 		/*点击返回上一页*/
			'.back click': function() {
				//alert(2);
				// temp begin
				// 在app外部使用 点击返回 如果没有可返回则关闭掉页面
				var param = can.deparam(window.location.search.substr(1));
				if(!param.version) {
					if(history.length == 1) {
						window.opener = null;
						window.close();
					} else {
						history.go(-1);
					}
					return false;
				}
				// temp end
				if(util.isMobile.Android() || util.isMobile.iOS()) {
					var jsonParams = {
						'funName': 'back_fun',
						'params': {}
					};
					LHHybrid.nativeFun(jsonParams);
					//console.log('back_fun');
				} else {
					history.go(-1);
				}
			}
		});

	});