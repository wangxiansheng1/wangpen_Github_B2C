define('lehu.h5.page.points', [
		'can',
		'zepto',
		'fastclick',
		'lehu.util',
		'lehu.h5.framework.comm',
		'lehu.h5.business.config',
		'lehu.hybrid',

		'lehu.h5.component.points'
	],
 	function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHpoints) {
		'use strict';
 		Fastclick.attach(document.body);

		var Exchange = can.Control.extend({
 			/**
			 * [init 初始化]
			 * @param  {[type]} element 元素
			 * @param  {[type]} options 选项
			 */
			init: function(element, options) {
				var points = new LHpoints("#points");

			}
		});

		new Exchange('#points');
	});