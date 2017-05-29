/*maxScroll*/
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery)
    }
})(function($) {

    $.fn.maxScroll = function(options) {
        var defaults = {},
            $this = $(this),
            options = $.extend({}, defaults, options);

        return $this.each(function() {

            var $obj = $(this);

            var $doc,
                $win,
                $objHeight,
                $yBarHeight,
                $yBarWidth,
                $scroll,
                $scrollHeight,
                $scrollWidth,
                $ySlider,
                $ySliderWrap,
                $ySliderHorizontal,
                $ySliderHorizontalWrap,
                $ySliderHeight,
                $ySliderHorizontalWidth,
                $ySliderHeightFull,
                $ySliderHorizontalWidthFull,
                $yEdgeBtm,
                $yEdgeRight,
                delta,
                deltaHorizontal,
                startPoint,
                startPointX,
                canDrag,
                canDragX,
                startPosition,
                startPositionX,
                direction,
                SCROLL_RATIO,
                SCROLL_RATIO_X,
                scrollScrollTop,
                scrollScrollLeft;



            function init() {

                if ($obj.data('maxScrollIsInited')) return;

                initVars();
                appendScroll();
                initSliderVars();
                hideNativeScrolls();
                updateVars();
                bindEvents();
                autoResize();
                setMobileState();
            }



            function initVars() {
                $obj.data('maxScrollIsInited', true);
                $doc = $(document);
                $win = $(window);
                $scroll = options.scrolledBlock ? $obj.children(options.scrolledBlock).eq(0) : $obj.children('.jsMaxScroll').eq(0);
                $objHeight = $obj.height();
            }



            function updateVars() {
                $objHeight = $obj.height();
                $scrollHeight = $scroll.get(0).scrollHeight;
                $yBarHeight = $obj.outerHeight();

                //set height to the obj in case it hasn't fixed height
                //$obj.css("height", $yBarHeight);

                //height of horizontal slider is 20% of the wrapper, same for vertical width
                $ySlider.css('height', options.sliderHeight || (($yBarHeight*$yBarHeight)/$scrollHeight));
                $ySliderHeight = $ySlider.height()/2;
                $ySliderHeightFull = $ySliderHeight*2;
                $yEdgeBtm = $yBarHeight - $ySliderHeightFull;
                delta = countDelta($yBarHeight, $scrollHeight, $ySliderHeightFull);
                startPoint = 0;
                startPosition = 0;
                canDrag = false;
                canDragX = false;
                SCROLL_RATIO = ($yBarHeight - $ySliderHeightFull)/(Math.ceil($scrollHeight/$yBarHeight*2));
                scrollScrollTop = $scroll.scrollTop();

                //on block resize, count slider proper position
                if (scrollScrollTop) {
                    $ySlider.css({'top': (scrollScrollTop/delta)});
                } else {
                    $ySlider.css({'top': 0});
                }

                $scrollWidth = $scroll.get(0).scrollWidth;
                $yBarWidth = $obj.outerWidth();
                $ySliderHorizontal.css('width', options.sliderWidth || (($yBarWidth*$yBarWidth)/$scrollWidth));
                $ySliderHorizontalWidth = $ySliderHorizontal.width()/2;
                $ySliderHorizontalWidthFull = $ySliderHorizontalWidth*2;
                $yEdgeRight = $yBarWidth - $ySliderHorizontalWidthFull;
                deltaHorizontal = countDeltaHorizontal($yBarWidth, $scrollWidth, $ySliderHorizontalWidthFull);
                startPointX = 0;
                startPositionX = 0;
                scrollScrollLeft = $scroll.scrollLeft();
                SCROLL_RATIO_X = ($yBarWidth - $ySliderHorizontalWidthFull)/(Math.ceil($scrollHeight/$yBarHeight*2));

                //on block resize, count slider proper position
                if (scrollScrollLeft) {
                    $ySliderHorizontal.css({'left': (scrollScrollLeft/deltaHorizontal)});
                } else {
                    $ySliderHorizontal.css({'left': 0});
                }
            }



            function bindEvents() {

                $ySlider
                    .on('mousedown touchstart', function(e) {
                        e.stopPropagation();
                        canDrag = true;
                        startPoint = e.pageY;
                        startPosition = $ySlider.position().top;

                        turnOffSelection($scroll);
                    })
                    .add($ySliderWrap)
                    .on('DOMMouseScroll mousewheel MozMousePixelScroll', onMouseWheel);

                $ySliderHorizontal
                    .on('mousedown touchstart', function (e) {
                        e.stopPropagation();
                        canDragX = true;
                        startPointX = e.pageX;
                        startPositionX = $ySliderHorizontal.position().left;

                        turnOffSelection($scroll);
                    })
                    .add($ySliderHorizontalWrap)
                    .on('DOMMouseScroll mousewheel MozMousePixelScroll', onMouseWheel);

                $doc
                    .on('mousemove.maxSlider touchmove.maxSlider', onMouseMove)
                    .on('mouseup touchend', onMouseUp);

                $win.on('resize', onWindowResize);

                $scroll.on('scroll', onMouseScroll);

                $ySliderWrap.on('mousedown touchstart', onClick);
                $ySliderHorizontalWrap.on('mousedown touchstart', onClickHorizontal);



                function onMouseMove(e) {

                    if(!canDrag && !canDragX) return;

                    if (canDrag) {

                        var diff1 = e.pageY - startPoint,
                            diff = diff1 + startPosition,
                            sliderResult, blockResult;

                        if (diff1 < 0 && Math.abs(diff1) >= startPosition) {
                            sliderResult = 0;
                            blockResult = 0;
                        } else if(diff1 > 0 && diff1 >= $yEdgeBtm - startPosition) {
                            sliderResult = $yEdgeBtm + 'px';
                            blockResult = $scrollHeight;
                        } else {
                            sliderResult = diff + 'px';
                            blockResult = diff*delta;
                        }

                        $ySlider.css({'top': sliderResult});
                        $scroll.scrollTop(blockResult);

                    } else if ( canDragX ) {

                        var diffX1 = e.pageX - startPointX,
                            diffX = diffX1 + startPositionX,
                            sliderResultX, blockResultX;

                        if (diffX1 < 0 && Math.abs(diffX1) >= startPositionX) {
                            sliderResultX = 0;
                            blockResultX = 0;
                        } else if(diffX1 > 0 && diffX1 >= $yEdgeRight - startPositionX) {
                            sliderResultX = $yEdgeRight + 'px';
                            blockResultX = $scrollWidth;
                        } else {
                            sliderResultX = diffX + 'px';
                            blockResultX = diffX*deltaHorizontal;
                        }

                        $ySliderHorizontal.css({'left': sliderResultX});
                        $scroll.scrollLeft(blockResultX);

                    }

                    e.preventDefault();
                }

                function onClick(e) {
                    if (canDrag) return;

                    var pageY = e.pageY,
                        offsetTop = $(this).offset().top,
                        diff = pageY - offsetTop - $ySliderHeight;

                    $scroll.scrollTop(diff*delta);
                }

                function onClickHorizontal(e) {
                    if (canDragX) return;

                    var pageX = e.pageX,
                        offsetLeft = $(this).offset().left,
                        diff = pageX - offsetLeft - $ySliderHorizontalWidth;

                    $scroll.scrollLeft(diff*deltaHorizontal);
                }

                function onMouseWheel(e) {
                    var sliderResult, blockResult,
                        curY = $ySlider.position().top;

                    if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                        direction = 'down';
                    } else {
                        direction = 'up';
                    }

                    if (curY > $yEdgeBtm - SCROLL_RATIO && direction === "down") {
                        sliderResult = $yEdgeBtm + 'px';
                        blockResult = $scrollHeight;
                    } else if (curY < 0) {
                        sliderResult = 0;
                        blockResult = 0;
                    } else if (curY  < $yEdgeBtm && direction === "down") {
                        sliderResult = curY + SCROLL_RATIO + 'px';
                        blockResult = (curY + SCROLL_RATIO) * delta;
                    } else if (direction === "up" && curY>0) {
                        sliderResult = curY - SCROLL_RATIO + 'px';
                        blockResult = (curY - SCROLL_RATIO) * delta;
                    }

                    $ySlider.css({'top': sliderResult});
                    $scroll.scrollTop(blockResult);

                    return false;
                }

                function onMouseUp() {
                    canDrag = false;
                    canDragX = false;

                    turnOnSelection($scroll);
                }

                function onMouseScroll(e) {
                    if (canDrag) return;
                    $ySlider.css({'top':  ($scroll.scrollTop())/delta});
                    $ySliderHorizontal.css({'left':  ($scroll.scrollLeft())/deltaHorizontal});
                }
            } //end of bindEvents




            /**HELPERS**/
            function initSliderVars() {
                $ySliderWrap = $obj.children('.maxscroll__slider-wrap').eq(0);
                $ySlider = $ySliderWrap.children('.maxscroll__slider').eq(0);
                $ySliderHorizontalWrap = $obj.children('.maxscroll__slider-wrap_horizontal').eq(0);
                $ySliderHorizontal = $ySliderHorizontalWrap.children('.maxscroll__slider_horizontal').eq(0);
            }

            /**
             * append and find scroll elements
             */
            function appendScroll() {
                if ($obj.children('.maxscroll__slider-wrap').length) return;

                $(
                    '<div class="maxscroll__slider-wrap">' +
                    '<div class="maxscroll__slider"></div>' +
                    '</div>' +
                    '<div class="maxscroll__slider-wrap_horizontal">' +
                    '<div class="maxscroll__slider_horizontal"></div>' +
                    '</div>'
                ).insertAfter($scroll);
            }


            /**
             * Get width of the browser scroll
             * @returns {number}
             */
            function getScrollbarWidth() {
                var scrollDiv, scrollbarWidth;

                scrollDiv = document.createElement("div");
                scrollDiv.className = "maxscroll-measure";
                document.body.appendChild(scrollDiv);
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);

                return scrollbarWidth;
            }

            function makeScrollBarWidthCache(f) {
                var cache = {};

                return function(x) {
                    if (!(x in cache)) {
                        cache[x] = f.call(this);
                    }
                    return cache[x];
                }
            }

            /*Remove cache for high resolution calculations*/
            //getScrollbarWidth = makeScrollBarWidthCache(getScrollbarWidth);


            function hideNativeScrolls() {
                var nativeScrollSize = getScrollbarWidth();

                $scroll.css({
                    'height': 'calc(100% + ' + nativeScrollSize + 'px)',
                    'width': 'calc(100% + ' + nativeScrollSize + 'px)'
                });
            }


            /**
             * Count delta - the ratio of block scroll to slider top position
             *
             * @param {Number} $yBarHeight
             * @param {Number} $scrollHeight
             * @param {Number} $ySliderHeightFull
             * @returns {number} delta
             */
            function countDelta($yBarHeight, $scrollHeight, $ySliderHeightFull) {
                delta = (($scrollHeight-$yBarHeight)/($yBarHeight - $ySliderHeightFull));

                //check if scroll is needed; 1 - because there are big screen resolutions and there are fractional numbers
                if ($scrollHeight-$yBarHeight >= 1) {
                    $ySliderWrap.show();
                } else {
                    $ySliderWrap.hide();
                }

                return delta;
            }


            /**
             * Count delta - the ratio of block scroll to slider left position
             *
             * @param $yBarWidth
             * @param $scrollWidth
             * @param $ySliderHorizontalWidthFull
             * @returns {number} deltaHorizontal
             */
            function countDeltaHorizontal($yBarWidth, $scrollWidth, $ySliderHorizontalWidthFull) {
                deltaHorizontal = (($scrollWidth-$yBarWidth)/($yBarWidth - $ySliderHorizontalWidthFull));

                //check if scroll is needed
                if ($scrollWidth-$yBarWidth >= 1) {
                    $ySliderHorizontalWrap.show();
                } else {
                    $ySliderHorizontalWrap.hide();
                }

                // check if height is auto then hide x scroll,
                // also if height of scrolled block is the same as wrapper
                if ($objHeight === $scroll.outerHeight(true)) {
                    hideXNativeScroll();
                }

                return deltaHorizontal;
            }


            function hideXNativeScroll() {
                var h = getScrollbarWidth();
                $scroll.css('marginBottom', -h);
            }


            /**
             * off selection from element
             */
            function turnOffSelection(el) {
                el.attr('unselectable','on')
                    .addClass('_unselectable')
                    .on('selectstart', returnFalse);
            }


            /**
             * on selection from element
             */
            function turnOnSelection(el) {
                el.removeAttr('unselectable')
                    .removeClass('_unselectable')
                    .off('selectstart', returnFalse);
            }


            var timeoutID, autoResizeFlag;

            /**
             * Turn on auto resize mode
             */
            function autoResize() {
                if (options.autoResize) {
                    $obj
                        .on('mouseenter touchstart', function() {
                            var tempScrollHeight, tempObjHeight, tempScrollWidth, tempObjWidth;

                            autoResizeFlag = true;
                            timeoutID = setTimeout(function resize() {

                                tempScrollHeight = $scroll.get(0).scrollHeight;
                                tempScrollWidth = $scroll.get(0).scrollWidth;
                                tempObjHeight = $obj.height();
                                tempObjWidth = $obj.outerWidth();

                                if ( ((tempScrollHeight !== $scrollHeight ||  tempObjHeight !== $objHeight) ||
                                    (tempScrollWidth !== $scrollWidth ||  tempObjWidth !== $yBarWidth)) &&
                                    $obj.length) {

                                    $obj.data('maxScroll').resize();
                                    $objHeight = tempObjHeight;
                                    $yBarWidth = tempObjWidth;
                                }

                                if (autoResizeFlag) setTimeout(resize, options.autoResizeTime || 1000);

                            }, options.autoResizeTime || 1000);
                        })
                        .on('mouseleave touchend', function() {
                            autoResizeFlag = false;
                            clearInterval(timeoutID);
                        });
                }
            }



            var windowResizeTimeoutID;

            function onWindowResize() {
                clearTimeout(windowResizeTimeoutID);
                windowResizeTimeoutID = setTimeout(function() {
                    hideNativeScrolls();
                }, options.windowResizeTime || 300)
            }


            /**
             * return false function, need for select logic
             */
            function returnFalse(){
                return false;
            }


            /**
             * detect mobile browser
             * @returns {boolean}
             */
            function isMobile() {
                return (/android|webos|iphone|ipad|ipod|blackberry|Windows Phone/i.test(navigator.userAgent));
            }


            function setMobileState() {
                if (isMobile()) {
                    $scroll.addClass('maxscroll_mobile');
                }
            }



            init();



            //Public api
            var publicMethods = {
                resize: updateVars
            };

            //set public methods
            $obj.data('maxScroll', publicMethods);

        });
    };
});



$(function() {
    var $scroll = $('.scroll');

    $scroll.maxScroll({
        autoResize: true
    });

    //trigger this method when resize block with scroll
    //$scroll.data('maxScroll').resize();
});
