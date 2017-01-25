define('lehu.h5.page.chants', [
		'can',
		'zepto',
		'fastclick',
		'lehu.util',
		'lehu.h5.framework.comm',
		'lehu.h5.business.config',
		'lehu.hybrid',

		'lehu.h5.component.chants'
	],
 	function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHchants) {
		'use strict';
 		Fastclick.attach(document.body);

		var Public= can.Control.extend({
 			/**
			 * [init 初始化]
			 * @param  {[type]} element 元素
			 * @param  {[type]} options 选项
			 */
			init: function(element, options) {
				var chants = new LHchants("#chants");

			}
		});

		new Public('#chants');
	});