"use strict";

/// <reference path="../../node_modules/@types/jquery/index.d.ts" />



(function(factory) {
    let define = (window as any).define;

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery)
    }
})(function($) {

    $.fn.maxEllipsis = function(options) {

        let defaults = {
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
            let $el = $(el),
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

                setEllipsis();
            }



            function updateVars() {
                $elW = $el.width();
            }



            function bindEvents() {
                $(window).on('resize.maxEllipsis', onResize);
            }



            function setEllipsis() {
                if (getDotFlag()) {
                    $el.text(addDots(fitText(textInitial)));
                    $el.attr('title', textInitial);
                } else {
                    $el.text(fitText(textInitial));
                    $el.removeAttr('title');
                }
            }



            function update(newOptions=0) {
                if (newOptions) {
                    options = $.extend(options, newOptions);
                }

                updateVars();
                setupFakeDiv();
                setEllipsis();
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
                    $el.css({
                        maxHeight: 'auto',
                        overflow: 'visible'
                    });

                    update();

                    resizeStartFlag = true;
                }, WINDOW_RESIZE_TIME);
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
                let arr = text.split(" ");
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



            /*Public Api*/
            let publicMethods = {
                update
            };

            //set public methods
            $el.data('maxEllipsis', publicMethods);
        });
    };

});