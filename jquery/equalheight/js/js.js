(function($, undefined) {

    jQuery.fn.equalHeight = function(options) {

        var defaults = {};

        var $this = $(this);

        options = $.extend({}, defaults, options);

        return $this.each(function() {
            var lines = $(this);

            function init() {

                lines.each(function() {
                    var $this = $(this),
                    className = $this.attr('class');

                    function resizeBlocks() {
                        setHeights($this.find('.js-equal-height'));
                    }

                    $(window).resize(resizeBlocks);
                    resizeBlocks();
                });
                
            }

            init();

            /*helpers*/
            function setHeights(obj) {
                var viewportWidth = $(window).width(),
                    maxHeight = 0;

                if (obj.length < 2) return;


                    obj.each(function() {

                        obj.css('height', 'auto');

                        var height = $(this).innerHeight();

                        if (height > maxHeight) {
                            maxHeight = height;
                        }
                    });

                    obj.css('height', maxHeight);
            }
        });

    };
        
})(jQuery);

$(function() {
    $('.line').equalHeight();
});