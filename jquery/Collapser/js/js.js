(function() {
    $(function() {
        var throttle = function(func, wait, options) {
            var context, args, result;
            var timeout = null;
            var previous = 0;
            options || (options = {});
            var later = function() {
                previous = options.leading === false ? 0 : new Date().getTime();
                timeout = null;
                result = func.apply(context, args);
                context = args = null;
            };
            return function() {
                var now = new Date().getTime();
                if (!previous && options.leading === false) previous = now;
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                    context = args = null;
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        };

        var Collapser = (function(params) {

            var $doc,
                $btnCollapse,
                $separator,
                $separatorHeight,
                $separatorHeightHalf,
                $block,
                $blockInner,
                $blockWidth,
                $blockHeight,
                $blockTop,
                $blockTopCoord,
                $blockTopHeight,
                $blockBottom,
                bottomEdge,
                allowDrag;

            var collapser = {
                separatorYOffset: function() {
                    var offsetYPos = $separator.offset().top;
                    return offsetYPos;
                },
                init: function() {
                    this.initVars();
                    this.setDefaultBlockHeight(this.showCollapser);

                    $btnCollapse.on('click', this.onCollapse);
                    $separator.on('mousedown touchstart', this.onMouseDown.bind(this));
                    $doc.on('mouseup touchend', this.onMouseUp.bind(this));
                },
                initVars: function() {
                    $doc = $(document);
                    $btnCollapse = $('.jsCollapseBtn');
                    $separator = $('.jsSeparator');
                    $block = $('.jsCollapser');
                    $blockInner = $('.jsCollapserInner');
                    $blockTop = $('.jsBlockTop');
                    $blockBottom = $('.jsBlockBottom');
                    $separatorHeight = $separator.outerHeight();
                    $separatorHeightHalf = $separatorHeight/2;
                    $blockWidth = $block.innerWidth();
                    $blockHeight = $block.outerHeight();
                    $blockTopHeight = $blockTop.outerHeight();
                    bottomEdge = $blockHeight - $separatorHeight;
                    blockBottomDiff = $blockHeight - $separatorHeight;
                    allowDrag = false;
                },
                showCollapser: function() {
                    $block.show();
                },
                setDefaultBlockHeight: function(callback) {
                    $blockTop.css({
                        'height': (params.BlockTopPercentHeight*$blockHeight/100).toFixed()
                    });
                    $blockBottom.css({
                        'height': (params.BlockBottomPercentHeight*$blockHeight/100 - $separatorHeight).toFixed()
                    });
                    callback();
                },
                onMouseDown: function(e) {
                    e.preventDefault();
                    e.type === 'touchstart' && (function(){e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];})();

                    allowDrag = true;
                    $blockTopCoord = $blockTop.offset().top;
                    $doc.on('mousemove.collapser touchmove.collapser', $.proxy(throttle(this.dragInit, 20), this));
                },
                dragInit: function(e) {
                    if (!allowDrag) {
                        return;
                    } else {
                        e.preventDefault();
                        e.type === 'touchmove' && (function(){e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];})();
                        this.drag(e);
                    }
                },
                drag: function(e) {
                    var cur = e.pageY - $separatorHeightHalf - $blockTopCoord;

                    if (cur > bottomEdge) {
                        return;
                    }

                    $blockTop.css('height', cur.toFixed());
                    $blockBottom.css('height', (blockBottomDiff - cur).toFixed());
                },
                onMouseUp: function(e) {
                    $doc.off('mousemove.collapser touchmove.collapser');
                    allowDrag = false;
                },
                onCollapse: function() {
                    $blockInner.toggleClass('block_collapsed');
                },
                setSeparatorWidth: function() {
                    var scrollDiv = $("<div/>", {class: 'scrollbar-measure'});
                    $('body').append(scrollDiv);
                    var scrollbarWidth = scrollDiv.get(0).offsetWidth - scrollDiv.get(0).clientWidth;
                    scrollDiv.remove();
                    $separator.css('width', $blockWidth - scrollbarWidth);
                }
            };

            $('.jsAddTextToTopDiv').click(function() {
                addText($blockTop.find('.block__top-inner').get(0));
            });

            $('.jsAddTextToBtmDiv').click(function() {
                addText($blockBottom.find('.block__bottom-inner').get(0));
            });

            function addText(obj) {
                obj.insertAdjacentHTML('beforeend', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi modi maiores voluptates officiis esse magni delectus consectetur, tempora pariatur exercitationem eum debitis itaque beatae ipsam animi quidem at dignissimos veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            }
        
            return collapser;
        })({
            BlockTopPercentHeight: 40,
            BlockBottomPercentHeight: 60
        });

        Collapser.init();
    });
})();