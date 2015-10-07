(function(jQuery) {

    $.fn.ellipsis = function(options) {

        var defaults = {
            h: 16
        },
        fakeDiv = $('<div />', {
            class: 'ellipsis__fake',
            css: {
                position: 'absolute',
                left: '-99999px'
            }
        });

        $('body').append(fakeDiv);

        options = $.extend({}, defaults, options);

        return $.each($(this), function(idx, el) {
            var $el = $(el),
                $elPadding = $el.css('padding'),
                $elLH = $el.css('lineHeight'),
                textInitial = $.trim($el.text()),
                WINDOW_RESIZE_TIME = 50,
                resizeStartFlag = true,
                $elW, resizeID;



            function init() {
                updateVars();
                setupFakeDiv();
                bindEvents();

                if (getDotFlag()) {
                    $el.text(addDots(fitText(textInitial)));
                    $el.attr('title', textInitial);
                } else {
                    $el.text(fitText(textInitial));
                    $el.removeAttr('title');
                }
            }



            function onResize() {

                if (resizeStartFlag) {
                    $el.css({
                        maxHeight: options.h,
                        overflow: 'hidden'
                    });
                    resizeStartFlag = false;
                }

                clearTimeout(resizeID);
                resizeID = setTimeout(function() {
                    init(getDotFlag());

                    $el.css({
                        maxHeight: 'auto',
                        overflow: 'visible'
                    });
                    resizeStartFlag = true;
                }, WINDOW_RESIZE_TIME);
            }



            function bindEvents() {
                $(window).on('resize.ncEllipsis', onResize);
            }



            function updateVars() {
                $elW = $el.width();
            }



            /*Helpers*/
            function fitText(text) {

                while (fakeDiv.height() > options.h) {
                    text = removeWord(text);
                    fakeDiv.text(text);
                }

                return text;
            }

            function removeWord(text) {
                var arr = text.split(" ");
                arr.pop();
                return arr.join(" ");
            }

            function addDots(text) {
                return text.slice(0, -3) + '...';
            }

            function getDotFlag() {
                return fakeDiv.outerHeight() > options.h;
            }

            function setupFakeDiv() {
                fakeDiv
                    .css({
                        'width': $elW,
                        'padding': $elPadding,
                        'lineHeight': $elLH
                    })
                    .text(textInitial);
            }


            init();
        });
    };

})($);


$(function() {
    console.time('timer');
    $('.ellipsis').ellipsis({
        h: 32
    });
    console.timeEnd('timer');

});