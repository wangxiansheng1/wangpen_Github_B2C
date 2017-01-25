requirejs.config({
    // urlArgs: "v=1.0",
    baseUrl: '/',
    shim: {
        'modeecb': {
            deps: ['tripledes'],
            exports: "modeecb"
        }
    },
    paths: {
        "can": "http://www.google.com/bower_components/canjs/amd/can",
        "zepto": "http://www.google.com/zepto",
        "zeptoalone": "scripts/common/zepto.min",
        "zepto.cookie": "http://www.google.com/zepto.cookie",
        "underscore": "http://www.google.com/bower_components/underscore/underscore-min",
        "fastclick": "http://www.google.com/fastclick",
        "md5": "http://www.google.com/bower_components/blueimp-md5/js/md5.min",
        "underscore.string": "http://www.google.com/bower_components/underscore.string/dist/underscore.string.min",
        "store": "http://www.google.com/bower_components/store/dist/store",
        "text": "../bower_components/text/text",
        "placeholders": "bower_components/Placeholders/build/placeholders",
        "moment": "bower_components/momentjs/min/moment.min",
        "moment-zh-cn": "bower_components/momentjs/locale/zh-cn",

        "lehu.h5.framework.comm": "http://www.google.com/app/scripts/framework/lehu.h5.framework.comm",
        "lehu.h5.business.config": "http://www.google.com/app/scripts/config/lehu.h5.business.config",
        "lehu.h5.api": "http://www.google.com/app/scripts/framework/lehu.h5.api",
        "lehu.h5.framework.global": "scripts/common/lehu.h5.framework.global",

        "lehu.hybrid": "http://www.google.com/scripts/util/lehu.hybrid",
        "lehu.helpers": "http://www.google.com/scripts/util/lehu.helpers",
        "lehu.util": "http://www.google.com/scripts/util/lehu.util.fn",
        "lehu.env.switcher": "http://www.google.com/scripts/util/lehu.env.switcher",
        "lehu.bridge": "http://www.google.com/scripts/util/lehu.bridge",

        'lehu.h5.header.header': 'scripts/header/lehu.h5.header.header',
        'lehu.h5.header.footer': 'scripts/header/lehu.h5.header.footer',
        'lehu.h5.header.download': 'scripts/header/lehu.h5.header.download',

        "lehu.h5.page.union": "scripts/page/lehu.h5.page.union",
        "lehu.h5.page.login": "scripts/page/lehu.h5.page.login",
        "lehu.h5.page.chants": "scripts/page/lehu.h5.page.chants",
        "lehu.h5.page.points": "scripts/page/lehu.h5.page.points",
        "lehu.h5.page.historical": "scripts/page/lehu.h5.page.historical",


        "lehu.h5.component.union": "scripts/component/lehu.h5.component.union",
        "lehu.h5.component.login": "scripts/component/lehu.h5.component.login",
        "lehu.h5.component.chants": "scripts/component/lehu.h5.component.chants",
        "lehu.h5.component.points": "scripts/component/lehu.h5.component.points",
        "lehu.h5.component.historical": "scripts/component/lehu.h5.component.historical",


        "template_header_footer": "templates/header/lehu.h5.header.footer.mustache",
        "template_header_header": "templates/header/lehu.h5.header.header.mustache",
        "template_header_download": "templates/header/lehu.h5.header.download.mustache",

        "template_components_union": "templates/components/lehu.h5.components.union.mustache",
        "template_components_login": "templates/components/lehu.h5.components.login.mustache",
        "template_components_chants": "templates/components/lehu.h5.components.chants.mustache",
        "template_components_points": "templates/components/lehu.h5.components.points.mustache",
        "template_components_historical": "templates/components/lehu.h5.components.historical.mustache",

        'lehu.utils.busizutil': 'scripts/utils/lehu.utils.busizutil',

        "swipe": "scripts/vendor/swipe",
        "slide": "scripts/vendor/slide",
        "imageazyload": "scripts/vendor/zepto.picLazyLoad.min",

        // 3des加密
        'tripledes': '../bower_components/cryptojslib/rollups/tripledes',
        'modeecb': '../bower_components/cryptojslib/components/mode-ecb'
    }
});