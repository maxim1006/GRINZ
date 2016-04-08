(function($, undefined) {

    jQuery.fn.equalHeight = function(options) {
        var defaults = {
            class: 'js-equal-height'
        };

        var $this = $(this);

        options = $.extend({}, defaults, options);

        return $this.each(function() {
            var lines = $(this);

            function init() {
                updateVars();
                bindEvents();
            }

            function updateVars() {
            }

            function bindEvents() {
                lines.each(function() {
                    var $this = $(this),
                        className = $this.attr('class');

                    function resize() {
                        setHeights($this.find('.' + options.class));
                    }

                    $(window).resize(resize);
                    resize();
                });
            }

            init();

            function setHeights(obj) {
                var maxHeight = 0;

                obj.css('height', 'auto');

                obj.each(function() {
                    var objHeight = $(this).innerHeight();

                    if (objHeight > maxHeight) {
                        maxHeight = objHeight;
                    }
                });

                if (maxHeight > 0) {
                    obj.css('height', maxHeight);
                }
            }
        });

    };
        
})(jQuery);

$(function() {

    $('.line').equalHeight({
        class: 'js-equal-height'
    });

});