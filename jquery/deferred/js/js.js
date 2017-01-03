"use strict";
(function () {
    $('.example-link').on('click', function (e) { return e.preventDefault(); });
    var Examples = window.Examples = {
        basic: function () {
            var $def = $.Deferred();
            $def.done(function () { return console.log('resolved'); });
            $def.fail(function () { return console.log('rejected'); });
            $("#btnResolve").click($def.resolve);
            $("#btnReject").click($def.reject);
            $("#btnReport").click(function () { return console.log($def.state()); });
        },
        slide: function () {
            var a1 = $.Deferred(), a2 = $.Deferred(), $slide1 = $('#slide1'), $slide2 = $('#slide2');
            $slide1.click(function () { return $slide1.slideUp(1000, a1.resolve); });
            $slide2.click(function () { return $slide2.slideUp(2000, a2.resolve); });
            a1.done(function () { return console.log('#slide1 resolved'); });
            a2.done(function () { return console.log('#slide2 resolved'); });
            $.when(a1, a2)
                .then(function () {
                console.log('both done');
                return 3;
            })
                .done(function (a) {
                setTimeout(function () {
                    console.log(a + ' arbitrary variable');
                    console.log('after 2s both done');
                }, 2000);
            });
        },
        funcTest: function () {
            var t = test().done(function () { return console.log('timeout'); });
            function test() {
                var d = $.Deferred();
                setTimeout(function () { return d.resolve(); }, 3000);
                return d.promise();
            }
        },
        animation: function () {
            $(".animation__btn").on("click", function () {
                var $animationDiv = $(".animation__div"), $animationPar = $(".animation__par");
                $animationPar.append("Started...");
                $animationDiv.each(function (i, el) {
                    $(el).fadeIn().fadeOut(1000 * (i + 1));
                });
                $animationDiv.promise().done(function () {
                    $animationPar.append(" Finished! ");
                });
            });
        },
        seekAnimation: function () {
            var $seekAnimationBtn = $(".seek-animation__btn"), $seekAnimationPar = $(".seek-animation__par"), $seekAnimationDiv = $(".seek-animation__div");
            $seekAnimationBtn.on("click", function () {
                $seekAnimationPar.append(" Started... ");
                $.when(seekAnimation()).done(function () { return $seekAnimationPar.append("Finished!"); });
            });
            function seekAnimation() {
                return $seekAnimationDiv
                    .fadeIn(800)
                    .delay(1200)
                    .fadeOut();
            }
        },
        then: function () {
            makeDeferred().then(function (data) { return console.log(data); }, function (error) { return console.log(error, "something went wrong"); });
            makeDeferred1().then(function (data) { return console.log(data); }, function (error) { return console.log(error, "something went wrong"); });
            function makeDeferred() {
                return $.getJSON('json.json');
            }
            function makeDeferred1() {
                return $.getJSON('json1.json');
            }
        },
        chaining: function () {
            var $div = $('.chaining__div');
            makeDef(200)
                .then(function () {
                $div.css('backgroundColor', 'red');
                console.log($div.css('left') + ' leftPosition');
            })
                .then(function () {
                makeDef(400)
                    .done(function () {
                    $div.css('backgroundColor', 'purple');
                    console.log($div.css('left') + ' leftPosition');
                });
            })
                .then(function () {
                makeDef(600)
                    .done(function () {
                    $div.css('backgroundColor', 'yellow');
                    console.log($div.css('left') + ' leftPosition');
                });
            })
                .then(function () {
                makeDef(800)
                    .done(function () {
                    $div.css('backgroundColor', 'green');
                    console.log($div.css('left') + ' leftPosition');
                });
            })
                .then(function () {
                makeDef(0)
                    .done(function () {
                    $div.css('backgroundColor', 'blue');
                    console.log($div.css('left') + ' leftPosition');
                });
            });
            function makeDef(leftPos) {
                var def = $.Deferred();
                $div.animate({ left: leftPos }, 1000, function () { return def.resolve(); });
                return def.promise();
            }
        },
        imgsLoad: function () {
            var $imgs = $('img');
            $imgs.each(function (index, elem) {
                var $this = $(elem), $def = $.Deferred();
                index += 1;
                $this.attr('src', 'img/' + index + '.jpg');
                $this
                    .one("load", function () { return $def.resolve('img ' + index + ' loaded'); })
                    .error(function () { return console.log('error'); });
                $def.then(function (result) {
                    console.log(result);
                    $this.fadeIn(200);
                }, function (err) { return console.log(err); });
            });
        }
    };
    Examples.basic();
    Examples.slide();
    Examples.animation();
    Examples.seekAnimation();
})();
//# sourceMappingURL=js.js.map