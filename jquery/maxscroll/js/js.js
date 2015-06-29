/*maxScroll*/
(function($, undefined) {

    $.fn.maxScroll = function(options) {
        var defaults = {},
            $this = $(this),
            options = $.extend({}, defaults, options);

        return $this.each(function() {

            var $obj = $(this);

            var $doc,
                $yBarHeight,
                $yBarWidth,
                $scroll,
                $scrollHeight,
                $scrollWidth,
                $ySlider,
                $ySliderHorizontal,
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
                SCROLL_RATIO_X;



            function init() {
                initVars();
                updateVars();
                bindEvents();
            }



            function initVars() {
                $doc = $(document);
                $scroll = $obj.find(options.scrolledBlock);
                $ySlider = $obj.find(options.slider);

                if (options.sliderHorizontal) {
                    $ySliderHorizontal = $obj.find(options.sliderHorizontal);
                }
            }



            function updateVars() {
                $scrollHeight = $scroll.get(0).scrollHeight;
                $yBarHeight = $obj.outerHeight();
                //height of horizontal slider is 20% of the wrapper, same for vertical width
                $ySlider.css('height', options.sliderHeight || $yBarHeight/5);
                $ySliderHeight = $ySlider.height()/2;
                $ySliderHeightFull = $ySliderHeight*2;
                $yEdgeBtm = $yBarHeight - $ySliderHeightFull;
                delta = countDelta($yBarHeight, $scrollHeight, $ySliderHeightFull);
                startPoint = 0;
                startPosition = 0;
                $ySlider.css({'top': 0});
                $scroll.scrollTop(0);
                canDrag = false;
                canDragX = false;
                SCROLL_RATIO = ($yBarHeight - $ySliderHeightFull)/50;

                if (options.sliderHorizontal) {
                    $scrollWidth = $scroll.get(0).scrollWidth;
                    $yBarWidth = $obj.outerWidth();
                    $ySliderHorizontal.css('width', options.sliderWidth || $yBarWidth/5);
                    $ySliderHorizontalWidth = $ySliderHorizontal.width()/2;
                    $ySliderHorizontalWidthFull = $ySliderHorizontalWidth*2;
                    $yEdgeRight = $yBarWidth - $ySliderHorizontalWidthFull;
                    deltaHorizontal = countDeltaHorizontal($yBarWidth, $scrollWidth, $ySliderHorizontalWidthFull);
                    startPointX = 0;
                    startPositionX = 0;
                    $ySliderHorizontal.css({'left': 0});
                    $scroll.scrollLeft(0);
                    SCROLL_RATIO_X = ($yBarWidth - $ySliderHorizontalWidthFull)/50;
                }
            }



            function bindEvents() {

                $ySlider.on('mousedown touchstart', function(e) {
                    canDrag = true;
                    startPoint = e.pageY;
                    startPosition = $ySlider.position().top;
                });

                if (options.sliderHorizontal) {
                    $ySliderHorizontal.on('mousedown touchstart', function (e) {
                        canDragX = true;
                        startPointX = e.pageX;
                        startPositionX = $ySliderHorizontal.position().left;
                    });
                }

                $doc.on('mousemove.maxSlider touchmove.maxSlider', onMouseMove);

                $obj.on('DOMMouseScroll mousewheel MozMousePixelScroll', onMouseScroll);

                $doc.on('mouseup touchend', onMouseUp);



                function onMouseMove(e) {

                    if( !canDrag && !canDragX ) return;

                    if ( canDrag ) {

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



                function onMouseScroll(e) {
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
                }



            } //end of bindEvents



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

                //check if scroll is needed
                if ($scrollHeight <= $yBarHeight) {
                    $ySlider.hide();
                } else {
                    $ySlider.show();
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
                if ($scrollWidth <= $yBarWidth) {
                    $ySliderHorizontal.hide();
                } else {
                    $ySliderHorizontal.show();
                }

                return deltaHorizontal;
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

})(jQuery);


$(function() {
    var $scroll = $('.scroll');

    $scroll.maxScroll({
        scrolledBlock: '.jsScrollInner',
        slider: '.jsScrollSlider',
        sliderHorizontal: '.jsScrollSliderHorizontal'
    });

    //trigger this method when resize block with scroll
    //$scroll.data('maxScroll').resize();

});