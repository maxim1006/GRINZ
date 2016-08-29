/*autoUpdate*/
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery)
    }
})(function($) {

    $.fn.autoUpdate = function(options) {

        var defaults = {
                mouseUpdateTime: 500,
                windowResizeTime: 500,
                blockResizeTime: 500,
                DOMNode: true
            },
            options = $.extend({}, defaults, options);



        return this.each(function() {

            var $obj = $(this);

            var $doc,
                $win,
                canUpdate;



            function init() {
                initVars();
                bindEvents();
            }



            function initVars() {
                $doc = $(document);
                $win = $(window);
                canUpdate = true;
            }



            function bindEvents() {
                var resizeEnd;

                if (options.windowResize) {
                    $win.on('resize', function () {
                        clearTimeout(resizeEnd);
                        resizeEnd = setTimeout(function () {
                            update();
                        }, options.windowResizeTime);
                    });
                }

                if (options.updateOnBlockResize && options.updateOnBlockResize.length) {
                    updateOnBlockResize();
                }
                
                if (options.mouseUpdate) {
                    initAutoupdate();
                }

                if (options.DOMNode) {
                    $obj.on('DOMNodeInserted', function () {
                        update();
                    });

                    $obj.on('DOMNodeRemoved', function () {
                        update();
                    });
                }
            } //end of bindEvents



            function initAutoupdate() {
                var autoResizeFlag,
                    timeoutID;

                $obj
                    .on('mouseenter touchstart', function() {

                        autoResizeFlag = true;

                        timeoutID = setTimeout(function tick() {

                            update();

                            if (autoResizeFlag) setTimeout(tick, options.mouseUpdateTime);

                        }, options.mouseUpdateTime);

                    })
                    .on('mouseleave touchend', function() {
                        autoResizeFlag = false;
                        clearInterval(timeoutID);
                    });
            }

            

            init();



            //Public api
            var publicMethods = {
                update: update.bind($obj),
                disableUpdate: disableUpdate.bind($obj),
                enableUpdate: enableUpdate.bind($obj)
            };

            //set public methods
            $obj.data('autoUpdate', publicMethods);



            /**HELPERS**/
            function update() {
                if (!canUpdate) return;
                options.onUpdate && options.onUpdate.call($obj, $obj);
            }

            function disableUpdate() {
                canUpdate = false;
            }

            function enableUpdate() {
                canUpdate = true;
            }
            
            function updateOnBlockResize() {
                var $resizedBlock = options.updateOnBlockResize,
                    $iframe = $('<iframe src="javascript:\'\'" style="opacity: 0;visibility: hidden;position:absolute;width: 100%;height: 100%;top: 0;left: 0"></iframe>'),
                    resizeEnd;

                //check for position prop
                if ($resizedBlock.css('position') === "static") {
                    $resizedBlock.css('position', 'relative');
                }

                $resizedBlock.append($iframe);

                $($iframe[0].contentWindow).on('resize', function () {
                    clearTimeout(resizeEnd);
                    resizeEnd = setTimeout(function () {
                        update();
                    }, options.blockResizeTime);
                });
            }
        });
    };
});