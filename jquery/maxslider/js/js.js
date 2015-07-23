(function($, undefined) {



    $(function() {

        var $doc,
            $scale,
            $scaleWidth,
            $scaleOffsetLeft,
            $slider,
            $sliderWidth,
            $sliderWidthHalf,
            $filler,
            $numbers,
            isDragged,
            startSliderPos,
            startX,
            edgeRight,
            numberToHighlight,
            arrOfCoords,
            arrOfCoordsLength,
            range;



        function init() {
            initVars();
            setNumbersPosition(arrOfCoords);
            bindEvents();
        }



        function initVars() {
            $doc = $(document);
            $scale = $('.jsScale');
            $scaleWidth = $scale.width();
            $scaleOffsetLeft = $scale.length ? $scale.offset().left : 0;
            $slider = $('.jsScaleSlider');
            $sliderWidth = $slider.width();
            $sliderWidthHalf = $sliderWidth/2;
            $numbers = $('.jsScaleNumber');
            $filler = $('.jsFiller');
            isDragged = false;
            startSliderPos = 0;
            edgeRight = $scaleWidth - $sliderWidthHalf;
            numberToHighlight = 1;
            arrOfCoords = [0,75,150,225,300,360,410,460,510,560,597,633,669,704,740];
            arrOfCoordsLength = arrOfCoords.length;
            range = 20;
        }



        function bindEvents() {

            $slider.on('mousedown touchstart', onDragStart);

            $doc.on('mousemove touchmove', onDrag);

            $doc.on('mouseup touchend', onDragEnd);

            $numbers.on('click', onNumberClick);

            function onDragStart(e) {

                e.type === 'touchstart' &&
                (function() {
                    e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                })();

                isDragged = true;
                startX = e.pageX;

                startSliderPos = $slider.position().left;
            }

            function onDrag(e) {

                e.type === 'touchmove' &&
                (function() {
                    e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                })();

                if (isDragged) {
                    var diff = e.pageX - startX;

                    var result;

                    if (diff < 0 && Math.abs(diff) >= startSliderPos) {
                        result = -$sliderWidthHalf;
                    } else if (diff > 0 && diff >= edgeRight - startSliderPos) {
                        result = edgeRight;
                    } else {
                        result = diff + startSliderPos;
                    }

                    $slider.css('left', result);

                    if (result) {
                        setFillerWidth(result);
                        findNumberToHighlight(result);
                    }
                }
            }

            function onDragEnd(e) {

                e.type === 'touchend' &&
                (function() {
                    e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                })();

                if (isDragged) {
                    setSliderToProperPosition();
                }

                isDragged = false;
            }

            function onNumberClick(e) {
                var $this = $(this),
                    ANIMATION_ADJUSTMENT = 5,
                    ANIMATION_TIME = 400;

                if ($this.hasClass('_active')) return;

                $this
                    .siblings()
                    .removeClass('_active')
                    .end()
                    .addClass('_active');

                $slider.animate({
                    'left': arrOfCoords[$this.index()] - ANIMATION_ADJUSTMENT +'px'
                }, ANIMATION_TIME);
                $filler.animate({'width':arrOfCoords[$this.index()] + ANIMATION_ADJUSTMENT +'px'}, ANIMATION_TIME);
            }

        }



        init();



        //helpers
        function setNumbersPosition(arrOfCoords) {
            var ratio, addition;

            for (var i=0; i<arrOfCoordsLength; i++) {
                $numbers
                    .eq(i)
                    .css('left', arrOfCoords[i]);
            }
        }

        function findNumberToHighlight(result) {
            for (var i=0; i<arrOfCoordsLength; i++) {
                if (result >= arrOfCoords[i] - range &&  result <= arrOfCoords[i] + range) {
                    (function(i) {
                        highlightNumber(i);
                    })(i);
                }
            }
        }

        function highlightNumber(num) {
            $numbers
                .removeClass('_active')
                .eq(num)
                .addClass('_active')
        }

        function setSliderToProperPosition() {
            var idx = $numbers.filter('._active').index(),
                ANIMATION_TIME = 200,
                ANIMATION_ADJUSTMENT = 5,
                position = arrOfCoords[idx] - ANIMATION_ADJUSTMENT;

            $slider.animate({'left':position +'px'}, ANIMATION_TIME);
            $filler.animate({'width':position + ANIMATION_ADJUSTMENT +'px'}, ANIMATION_TIME);
        }

        function setFillerWidth(num) {
            var ANIMATION_ADJUSTMENT = 5;
            $filler.css('width', num + ANIMATION_ADJUSTMENT)
        }

    });



})(jQuery);
