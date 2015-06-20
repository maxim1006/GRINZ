$(function() {

    (function() {
        //1st jQuery approach throttle
        var timer1 = 0,
            DELAY_1 = 1000,
            i = 0;

        $('.throttle1').on('mousemove', function(e) {
            if (!timer1) {
                timer1 = setTimeout(function() {
                    i++;
                    console.log('jQuery mousemove' + ' Функция вызвалась ' + i + ' раз ' + new Date());
                    timer1 = 0;
                }, DELAY_1);
            }
        });
    })();

    (function() {
        //underscore.js throttle
        var DELAY_2 = 1000,
            j = 0;

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

        var throttled = throttle(throttledInit, DELAY_2);

        function throttledInit(event) {
            j++;
            console.log('Underscore throttle on mousemove ' + ' Функция вызвалась ' + j + ' раз ' + new Date());
        }

        $('.throttle2').on('mousemove', throttled);
    })();

    (function() {
        //Ben Alman's plugin throttle
        $(function() {
            var DELAY_3 = 1000,
                k = 0;

            function f() {
                k++;
                console.log('Ben Alman\'s plugin ' + ' Функция вызвалась ' + k + ' раз ' + new Date());
            }
            $('.throttle3').on('mousemove', $.throttle(DELAY_3,f) );
        });
    })();
     
    //resizeend
    var resizeend;

    $(window).resize(function () {
        clearTimeout(resizeend);
        resizeend = setTimeout(function() {
            console.log('resizeend');
        }, 300);
    });

    (function() {
        var DELAY_2 = 1000,
            j = 0;

        var debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = new Date().getTime() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

        function debounceInit(event) {
            j++;
            console.log('Underscore debounce on mousemove' + ' Функция вызвалась ' + j + ' раз ' + new Date());
        }

        $('.debounce2').on('mousemove', debounce(debounceInit, 300));

    })();

    (function() {
        //Ben Alman's plugin debounce
        $(function() {
            var DELAY_3 = 300,
                k = 0;

            function f() {
                k++;
                console.log('Ben Alman\'s plugin debounce ' + ' Функция вызвалась ' + k + ' раз ' + new Date());
            }
            $('.debounce3').on('mousemove', $.debounce(DELAY_3,f) );
        });
    })();

    (function() {
        //Javascript approach
        var debounceend;

        $('.debounce4').on('mousemove', function () {
            clearTimeout(debounceend);
            debounceend = setTimeout(function() {
                console.log('debounceend');
            }, 300);
        });
    })();


});


//Ben Alman's plugin code
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);