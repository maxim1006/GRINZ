(function($, undefined) {
    $.fn.maxTooltip = function(options) {
        var defaults = {
            modeClick: false, //click or hover mode
            heredity: false, //on/off heredity on hover on tooltip
            TIMEOUT_OF_SHOW: 150, //time while tooltip appears 
            TIMEOUT_OF_HIDE: 400 //time while tooltip disappears 
        };

        options = $.extend({}, defaults, options);


        /***block on hover ***/
        var timeoutIn = null,
        timeoutOut = null;

        if (!options.modeClick) {

            this
            .on('mouseenter', function() {

                var $this = $(this);

                $('.js-maxtooltip')
                    .not($this)
                        .removeClass('js-maxtooltip-hover')
                            .find('.maxtooltip')
                                .hide();

                //heredity true
                if (options.heredity) {
                    setTooltip($this);
                    setPosition($this);
                    return;
                }

                clearTimeout(timeoutOut);
                $this.addClass('js-maxtooltip-hover'); //need for the link highliting

                timeoutIn = setTimeout(function() {
                    setTooltip($this);
                    setPosition($this);
                }, options.TIMEOUT_OF_SHOW);
                    
            })
            .on('mouseleave', function() {

                var $this = $(this),
                $tooltip = $this.find('.maxtooltip');

                //heredity true
                if (options.heredity) {
                    $tooltip.hide();
                    return;
                }

                clearTimeout(timeoutIn);

                timeoutOut = setTimeout(function() {
                    $tooltip.fadeOut();
                    $this.removeClass('js-maxtooltip-hover');
                }, options.TIMEOUT_OF_HIDE);

            })
            .on('mousemove', function(e) {

                if (!options.heredity) {
                    return false;
                } else {
                    var $this = $(this);
                    if (!$(e.target).is($this)) {
                        $this.find('.maxtooltip').hide();
                    }
                }

            });
        } //end of if

        /***block on click***/
        if (options.modeClick) {

            $(document)
            .on('click', '.js-maxtooltip', function(e) {
                var $this = $(this),
                $tooltip = $this.find('.maxtooltip'),
                $target = $(e.target);

                if ($tooltip.is(':visible') && !$target.hasClass('maxtooltip') && $tooltip.has($target).length === 0) {
                    $tooltip.fadeOut();
                    return;
                }
                
                setTooltip($this);
                setPosition($this);
                
            })
            .on('click', function(e) {
                var $target = $(e.target),
                $tooltip = $('.js-maxtooltip');
                if (!$target.hasClass('maxtooltip') && !$target.hasClass('js-maxtooltip') && $tooltip.has($target).length === 0) {
                    $('.maxtooltip').fadeOut();
                }
            });

        } //end of if



        /*helpers*/
        function setTooltip(obj) {
            if (obj.find('.maxtooltip').length) {
                return;
            } else {
                var d = obj.data('info'),
                cls = d.tClass,
                txt = d.tText,
                w = d.tWidth,
                h = d.tCode,
                t = $('<span>', {
                    "class": cls,
                    "width": w,
                    "text": txt,
                    "html": h
                });

                t.appendTo(obj);

            }
        }

        function setPosition(obj) {
            var t = obj.find('.maxtooltip'),
            w = t.outerWidth(),
            h = t.outerHeight(),
            lineH = obj.outerHeight(),
            lineW = obj.outerWidth();

            if (t.hasClass('maxtooltip__right') || t.hasClass('maxtooltip__left')) {
                t.css({top: lineH/2 - h/2});
            } else if (t.hasClass('maxtooltip__bottom') || t.hasClass('maxtooltip__top')) {
                t.css({left: -w/2 + lineW/2});
            }

            t.fadeIn();

        }

    };
})(jQuery);

$(function() {
    $('.js-maxtooltip').maxTooltip({modeClick: false, heredity: false});
});

