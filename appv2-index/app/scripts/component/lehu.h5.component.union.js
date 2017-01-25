define('lehu.h5.component.union', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
		'lehu.utils.busizutil',
		'text!template_components_union'
	],
	function($, can, LHConfig, util, LHAPI, LHHybrid,
		busizutil,
		template_components_union) {
		'use strict';
		return can.Control.extend({
			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				var that = this;
				this.initData();
				var renderList = can.mustache(template_components_union);
				var html = renderList(this.options);
				that.element.html(html);
				that.getUionData.apply(that);
				//判断用户是否输入内容符合要求
				setInterval(function() {
					that.getMessage.apply(that);
				}, 0);
			},
			initData: function() {
				this.param = {};
				this.param = can.deparam(window.location.search.substr(1));
				this.URL = LHHybrid.getUrl();
			},
			//商户
			getUionData: function() {
				var that = this;
				var api = new LHAPI({
					url: "http://app.lehumall.com/queryInfoForleague.do",
					data: {
						goodsId: that.param.goodsId
					},
					method: "post"
				});
				api.sendRequest()
					.done(function(data) {
						var goodsList = data.data[0];
						var html = "";
						html += "<div class='union_coupon_car'><img src=' " + that.URL.IMAGE_URL + goodsList.GOODS_IMG + "'></div>";
						html += "<div class='union_coupon_title' data-goods" + goodsList.GOODS_ID + "><span class='coupon_title_name'>" + goodsList.GOODS_NAME + "</span><span class='coupon_title_fuwu'>" + goodsList.GOODS_DESCRIBE + "</span><span class='coupon_title_carname'>" + goodsList.MERCHANT_NAME + "</span><span class='coupon_title_val'>" + goodsList.EXCHANGE_VALUE + "积分</span></div>";
						$('.union_coupon').empty().append(html);
					})
					.fail(function(error) {
						util.tip("数据错误，请重新进入！", 2000);
					})
			},
			//查询用户积分
			'.union_card_fc click': function(element, event) {
				var that = this;
				var PHVALUE = $.trim(String($('.union_card_code').val()));
				if(PHVALUE == "") {
					util.tip("卡号不能为空！", 2000);
					return false;
				}
				var api = new LHAPI({
					url: "http://app.lehumall.com/queryIntegralForleague.do",
					data: {
						cardCode: PHVALUE,
						type: "1"
					},
					method: "post"
				})
				api.sendRequest()
					.done(function(data) {
						if(data.type == 0) {
							util.tip(data.msg, 2000);
							return false;
						}
						if(data.type == 1) {
							$('.union_integral_val').html(parseInt(data.iBalance) + "积分");
							return false;
						}
					})
					.fail(function() {
						util.tip("会员信息不存在!", 2000);
					})
			},
			//获取短信验证码
			'.union_ph_mes click': function(element, event) {
				var that = this;
				var timer;
				var PHVALUE = $.trim(String($('.union_card_code').val()));
				if(PHVALUE == "") {
					util.tip("卡号不能为空！", 2000);
					return false;
				}
				var api = new LHAPI({
					url: "http://app.lehumall.com/sendMessageForleague.do",
					data: {
						cardCode: PHVALUE,
						type: "1"
					},
					method: "post"
				})
				api.sendRequest()
					.done(function(data) {
						if(data.type == 1) {
							console.log("发送成功");
							console.log(2);
							$(element).attr("disabled", "true").css("color", "#999999");
							$(element).html("60秒后重新获取");
							timer = setInterval(function() {
								var COUNT = parseInt($(element).html());
								COUNT = COUNT - 1;
								$(element).html(COUNT + "秒后重新获取");
								console.log(COUNT);
								if(COUNT == 0) {
									clearInterval(timer);
									$(element).removeAttr("disabled").html("点击获取验证码").css("color", "#f5174b");
								}
							}, 1000)
						}
					})
					.fail(function(error) {
						util.tip("系统错误，发送失败", 2000)
					})
			},
			//商品数量加减
			'.number_btn_jian click': function() {
				var shuliang = parseInt($('.number_btn_shumu').val());
				if(parseInt(shuliang) == 1) {
					return false;
				}
				shuliang -= 1;
				$('.number_btn_shumu').val(shuliang);
			},
			'.number_btn_jia click': function() {
				var shuliang = parseInt($('.number_btn_shumu').val());
				shuliang += 1;
				$('.number_btn_shumu').val(shuliang);
			},
			//确定兑换
			'.union_exchange click': function(element, event) {
				var that = this;
				var MerchantCode = localStorage.getItem("MerchantCode");
				var PHVALUE = $.trim(String($('.union_card_code').val()));
				var PHLENE = $.trim(String($('.union_ph_code').val()));
				var NUM = parseInt($('.number_btn_shumu').val());
				if(PHVALUE == "") {
					util.tip("卡号不能为空！", 2000);
					return false;
				};
				if(PHLENE == "") {
					util.tip("验证码不能为空！", 2000);
					return false;
				};
				var api = new LHAPI({
					url: "http://app.lehumall.com/exchangeForleague.do",
					data: {
						merchantCode: MerchantCode,
						cardCode: PHVALUE,
						phoneCode: PHLENE,
						goodsId: that.param.goodsId,
						num: NUM
					},
					method: "post"
				})
				api.sendRequest()
					.done(function(data) {
						if(data.type == "1") {
							util.tip("兑换积分成功!", 2000);
							$('.union_integral_val').html(parseInt(data.balanceIntegral) + "积分");
							$('.number_btn_shumu').val("1");
							setTimeout(function() {
								window.location.href = "http://app.lehumall.com/html5/activity/yylm/chants.html?merchantCode=" + that.param.merchantCode;
							}, 2000);
						} else {
							util.tip(data.msg, 2000);
						}
					})
					.fail(function(error) {
						util.tip("兑换失败!", 2000);
					})
			},
			getMessage: function() {
				var PHVALUE = $.trim(String($('.union_card_code').val()));
				var PHLENE = $.trim(String($('.union_ph_code').val()));
				if(!PHLENE == "" && !PHVALUE == "") {
					$('.union_exchange').removeAttr("disabled").css("color", "#f5174b");
					return false;
				} else {
					$('.union_exchange').attr("disabled", "true").css("color", "#999");
					return false;
				}
			},
			//跳转兑换积分列表页
			'.rightlink click': function() {
				var that = this;
				window.location.href = "http://app.lehumall.com/html5/activity/yylm/historical.html?goodsId=" + that.param.goodsId;
			},
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