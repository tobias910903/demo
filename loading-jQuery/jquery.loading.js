/**
 * @author 
 * @date 2018/3/4
 * @Description: loading
*/
;(function($, window, document,undefined) {
    var loader = function(ele, opt) {
        this.$element = ele.selector;
        this.defaults = {
            'switch': true
        };
        this.options = $.extend({}, this.defaults, opt);
    };

    loader.prototype = {
        loadingInit:function(){
            // loading框开关
            if (this.options.switch == true) {
                if ($(this.$element).children(".loading-box").length == 0) {
                    $(this.$element).css("overflow","hidden").prepend("<div class='loading-box'><div class='loading-gif'></div></div>");
                }
            } else if (this.options.switch == false) {
                $(this.$element).css("overflow","visible").children(".loading-box").remove();
            }

            // 绑定的位置
            if(this.$element == "body"){
                $(".loading-box").css({"position":"fixed","background":"rgba(0, 0, 0, 0.5)"});
            }else{
                $(this.$element).css("position","relative");
                $(".loading-box").css({"position":"absolute","background":"transparent"});
            }
        }
    };

    $.fn.loadingBox = function(options) {
        var loadPosition = new loader(this, options);
        return loadPosition.loadingInit();
    };

})(jQuery, window, document);
