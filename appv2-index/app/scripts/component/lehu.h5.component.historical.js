define('lehu.h5.component.historical', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
		'lehu.utils.busizutil',
		'text!template_components_historical'
	],
	function($, can, LHConfig, util, LHAPI, LHHybrid, busizutil, template_components_historical) {
		'use strict';
		return can.Control.extend({
			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				var that = this;
				var renderList = can.mustache(template_components_historical);
				var html = renderList(this.options);
				that.initData();
				that.element.html(html);
				that.gethistoricalData.apply(that);
			},
			initData: function() {
				this.param = {};
				this.param = can.deparam(window.location.search.substr(1));
			},
			//用户端
			gethistoricalData: function() {
				var that = this;
				var MerchantCode = localStorage.getItem("MerchantCode");
				var api = new LHAPI({
					url: "http://app.lehumall.com/queryExchangeListForleague.do",
					data: {
						goodsId: that.param.goodsId,
						pageIndex: 1,
						pageSize: 100,
						merchantCode: MerchantCode
					},
					method: "post"
				});
				api.sendRequest()
					.done(function(data) {
						if(!data.recordList) {
							return false;
						}
						var RecordList = data.recordList;
						var html = "";
						for(var i = 0; i < RecordList.length; i++) {
							var str = RecordList[i].EXCHANGE_PHONE;
 							var PHONE = str.replace((str.substring(3, 7)),'****');	
							html += "<li class='historical_coupon_list'><div class='historical_coupon_title_f'><h3 class='coupon_title_name'>" + RecordList[i].GOODS_NAME + "</h3><span class='coupon_title_val'>" + RecordList[i].EXCHANGE_VALUE + "积分&nbsp;(&nbsp;数量&nbsp;x&nbsp;" + RecordList[i].EXCHANGE_NUM + ")</span></div>";
							html += "<div class='historical_coupon_title_t'><h3 class='coupon_title_man'>" + PHONE + "</h3><span class='coupon_title_record'>" + RecordList[i].EXCHANGE_TIME + "</span></div></li>";
						}
						$('.historical_coupon').empty().append(html);
					})
					.fail(function(error) {
						util.tip("数据错误，请重新进入！", 2000);
					});
			},
			/*点击返回上一页*/
			'.back click': function() {
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
					console.log('back_fun');
				} else {
					history.go(-1);
				}
			}
		});

	});