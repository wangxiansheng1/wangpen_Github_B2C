define('lehu.h5.component.login', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
		'lehu.utils.busizutil',
		'text!template_components_login'
	],
	function($, can, LHConfig, util, LHAPI, LHHybrid, busizutil, template_components_login) {
		'use strict';
		return can.Control.extend({
			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				var that = this;
				var renderList = can.mustache(template_components_login);
				var html = renderList(this.options);
				that.element.html(html);
				this.initData();
			},
			initData: function() {
				this.param = {};
				this.param = can.deparam(window.location.search.substr(1));
				this.URL = LHHybrid.getUrl();
			},
			//商户登陆
			'.btn_login click': function(element, event) {
				var USERNAME = $('.txt_username').val();
				var PASSWORD = $('.txt_password').val();
				var api = new LHAPI({
					url: "http://app.lehumall.com/leagueMerchantlogin.do",
					data: {
						userName: USERNAME,
						password: PASSWORD
					},
					method: "post"
				});
				api.sendRequest()
					.done(function(data) {
						var MerchantCode = data.merchantCode;
						if(data.type == "1") {
							window.location.href = "http://app.lehumall.com/html5/activity/yylm/chants.html";
							localStorage.removeItem("MerchantCode");
							localStorage.MerchantCode = MerchantCode;
						} else {
							$('.err_msg').empty().html(data.msg);
							$('.txt_username').val("");
							$('.txt_password').val("");
							$('.icon_close').hide();
						}
					})
					.fail(function() {
						util.tip("登录失败", 2000);
					})
			},
			//判断用户是否输入电话号码 
			'.txt_username keyup': function() {
				var USERNAME = $('.txt_username').val();
				var PASSWORD = $('.txt_password').val();
				$('.err_msg').empty();
				if(USERNAME == "") {
					$('.icon_close').hide();
					$('.err_msg').empty().html("电话号码不能为空！");
					return false;
				}
				if(!USERNAME == "") {
					$('.icon_close').show();
					if(!PASSWORD == "" && !USERNAME == "") {
						$('.btn_login').removeAttr("disabled").css({
							"background": "#f5174b",
							"color": "#ffffff"
						});
					}
				}

			},
			//账号密码置空
			'.icon_close click': function(element, event) {

				$('.txt_username').val("");
				$('.txt_password').val("");
				$(element).hide();
			},
			//当用户输入电话号码格式不对提示错误
			'.txt_username blur': function() {
				var USERNAME = $('.txt_username').val();
				if(USERNAME == "") {
					$('.err_msg').empty().html("电话号码不能为空！");
					return false;
				}
				console.log(USERNAME.length);
			},
			//判断用户是否输入密码
			'.txt_password keyup': function() {
				var USERNAME = $('.txt_username').val();
				var PASSWORD = $('.txt_password').val();
				$('.err_msg').empty();
				if(PASSWORD == "") {
					$('.err_msg').empty().html("密码不能为空！");
					return false;
				}
				if(!PASSWORD == "" && !USERNAME == "") {
					$('.btn_login').removeAttr("disabled").css({
						"background": "#f5174b",
						"color": "#ffffff"
					});
				}
			},
			//当用户输入电话号码格式不对提示错误
			'.txt_password blur': function() {
				var USERNAME = $('.txt_username').val();
				if(USERNAME == "") {
					$('.err_msg').empty().html("密码不能为空！");
					return false;
				}
			},
			//页面返回按钮
			'.back click': function() {
				if(util.isMobile.Android() || util.isMobile.iOS()) {
					var jsonParams = {
						'funName': 'back_fun',
						'params': {}
					};
					LHHybrid.nativeFun(jsonParams);
					console.log('back_fun');i	
				} else {
					history.go(-1);	
				}
			}
		});

	});