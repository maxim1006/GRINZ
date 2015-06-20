$(function() {

    //1st jQuery approach
    var timer1 = 0,
        DELAY_1 = 1000,
        i = 0;

    $('.test1').on('mousemove', function(e) {
        if (!timer1) {
            timer1 = setTimeout(function() {
                i++;
                console.log('jQuery mousemove' + ' Функция вызвалась ' + i + ' раз ' + new Date());
                timer1 = 0;
            }, DELAY_1);
        }
    }).mousemove();


    //underscore.js
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
        console.log('Underscore mousemove' + ' Функция вызвалась ' + j + ' раз ' + new Date());
    }

    $('.test2').on('mousemove', throttled).mousemove();


    //Ben Alman's plugin
    $(function() {var DELAY_3 = 1000,
        k = 0;
        function f() {
            k++;
            console.log('Ben Alman\'s plugin' + ' Функция вызвалась ' + k + ' раз ' + new Date());
        }
        $('.test3').on('mousemove', $.throttle(DELAY_3,f) );
    });
     
    //resizeend
    var resizeend;

    $(window).resize(function () {
        clearTimeout(resizeend);
        resizeend = setTimeout(function() {
            console.log('resizeend');
        }, 300);
    });


});


//Ben Alman's plugin code
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);