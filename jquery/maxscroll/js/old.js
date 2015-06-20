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
                $scroll,
                $scrollHeight,
                $ySlider,
                $ySliderHeight,
                $ySliderHeightFull,
                $yEdgeBtm,
                $ySliderBtmEdge,
                delta,
                startPoint,
                canDrag,
                startPosition,
                direction,
                SCROLL_RATIO;





            function init() {
                updateVars();
                bindEvents();
            }





            function updateVars() {
                $doc = $(document);
                //$scroll = $obj.find('.jsLineupsTableInner');
                $scroll = $obj.find(options.wrapper);
                $scrollHeight = $scroll.get(0).scrollHeight;
                $yBarHeight = $obj.outerHeight();
                //$ySlider = $obj.find('.jsLineupsInner');
                $ySlider = $obj.find(options.slider);
                $ySliderHeight = $ySlider.height()/2;
                $ySliderHeightFull = $ySliderHeight*2;
                $yEdgeBtm = $yBarHeight - $ySliderHeightFull;
                $ySliderBtmEdge = $yBarHeight - $ySliderHeightFull;
                delta = countDelta($yBarHeight, $scrollHeight, $ySliderHeightFull);
                startPoint = 0;
                startPosition = 0;
                $ySlider.css({'top': 0});
                $scroll.scrollTop(0);
                canDrag = false;
                SCROLL_RATIO = ($yBarHeight - $ySliderHeightFull)/50;
            }





            function bindEvents() {

                $ySlider.on('mousedown touchstart', function(e) {
                    canDrag = true;
                    startPoint = e.pageY;
                    startPosition = $ySlider.position().top;

                    $doc.on('mousemove.maxSlider touchmove.maxSlider', onMouseMove);
                });

                $obj.on('DOMMouseScroll mousewheel MozMousePixelScroll', onMouseScroll);





                function onMouseMove(e) {
                    var sliderResult, blockResult;

                    if(!canDrag) return;

                    var diff1 = e.pageY - startPoint,
                        diff = diff1 + startPosition;

                    if (diff1 < 0 && Math.abs(diff1) >= startPosition) {
                        sliderResult = 0;
                        blockResult = 0;
                    } else if(diff1 > 0 && diff1 >= $yEdgeBtm - startPosition) {
                        sliderResult = $ySliderBtmEdge + 'px';
                        blockResult = $scrollHeight - $yBarHeight;
                    } else {
                        sliderResult = diff + 'px';
                        blockResult = diff*delta;
                    }

                    $ySlider.css({'top': sliderResult});
                    $scroll.scrollTop(blockResult);

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
                        sliderResult = $ySliderBtmEdge + 'px';
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

            } //end of bindEvents



            $(document).on('mouseup touchend', function() {
                canDrag = false;
                $(this).off('mousemove.maxSlider touchmove.maxSlider');
            });





            function countDelta($yBarHeight, $scrollHeight, $ySliderHeightFull) {
                delta = (($scrollHeight-$yBarHeight)/($yBarHeight - $ySliderHeightFull));

                //check if scroll is needed
                if ($scrollHeight <= $yBarHeight) {
                    $ySlider.hide();
                }

                return delta;
            }



            init();

        });
    };

})(jQuery);