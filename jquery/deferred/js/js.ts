"use strict";

/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

(function() {

    $('.example-link').on('click', (e:JQueryEventObject) => e.preventDefault());

    let Examples = (<any>window).Examples = {

        basic():void {
            let $def:JQueryDeferred<JQuery> = $.Deferred();

            //прописываю то что надо сделать когда наступит состояние
            //готово или ошибка
            $def.done(() => console.log('resolved'));
            $def.fail(() => console.log('rejected'));

            //указываю когда наступает resolve или reject
            $("#btnResolve").click($def.resolve);
            $("#btnReject").click($def.reject);
            $("#btnReport").click(() => console.log($def.state()));
        },

        slide():void {
            let a1:JQueryDeferred<JQuery> = $.Deferred(),
                a2:JQueryDeferred<JQuery> = $.Deferred(),
                $slide1:JQuery = $('#slide1'),
                $slide2:JQuery = $('#slide2');

            $slide1.click(() => $slide1.slideUp(1000, a1.resolve));
            $slide2.click(() => $slide2.slideUp(2000, a2.resolve));

            a1.done(() => console.log('#slide1 resolved'));
            a2.done(() => console.log('#slide2 resolved'));

            $.when(a1, a2)
                .then(() => {
                    console.log('both done');
                    return 3;
                })
                .done((a:number) => {
                        setTimeout(() => {
                            console.log(a + ' arbitrary variable');
                            console.log('after 2s both done');
                        }, 2000);
                    }
                )
        },

        funcTest():void {
            let t = test().done(() => console.log('timeout'));

            /*Helpers*/
            function test():JQueryPromise<JQuery> {
                let d = $.Deferred();
                setTimeout(() => d.resolve(), 3000);
                return d.promise();
            }
        },

        animation():void {
            $( ".animation__btn" ).on( "click", () => {

                let $animationDiv:JQuery = $(".animation__div"),
                    $animationPar:JQuery = $(".animation__par");

                $animationPar.append( "Started..." );

                $animationDiv.each((i, el) => {
                    $(el).fadeIn().fadeOut( 1000 * ( i + 1 ) );
                });

                $animationDiv.promise().done(() => {
                    $animationPar.append( " Finished! " )
                });
            });
        },

        seekAnimation():void {
            let $seekAnimationBtn:JQuery = $(".seek-animation__btn"),
                $seekAnimationPar:JQuery = $(".seek-animation__par"),
                $seekAnimationDiv:JQuery = $( ".seek-animation__div" );

            $seekAnimationBtn.on( "click", function() {
                $seekAnimationPar.append( " Started... " );

                $.when(seekAnimation()).done(() => $seekAnimationPar.append("Finished!"));
            });

            /*Helpers*/
            function seekAnimation() {
                return $seekAnimationDiv
                    .fadeIn(800)
                    .delay(1200)
                    .fadeOut();
            }
        },

        then():void {
            makeDeferred().then(
                (data) => console.log(data),
                (error) => console.log(error, "something went wrong")
            );

            makeDeferred1().then(
                (data) => console.log(data),
                (error) => console.log(error, "something went wrong")
            );

            /*Helpers*/
            function makeDeferred() {
                return $.getJSON('json.json');
            }

            function makeDeferred1() {
                return $.getJSON('json1.json');
            }
        },

        chaining():void {
            let $div = $('.chaining__div');

            makeDef(200)
                .then(() => {
                    $div.css('backgroundColor', 'red');
                    console.log($div.css('left') + ' leftPosition');
                })
                .then(() => {
                    makeDef(400)
                        .done(() => {
                            $div.css('backgroundColor', 'purple');
                            console.log($div.css('left') + ' leftPosition');
                        });
                })
                .then(() => {
                    makeDef(600)
                        .done(() => {
                            $div.css('backgroundColor', 'yellow');
                            console.log($div.css('left') + ' leftPosition');
                        });
                })
                .then(() => {
                    makeDef(800)
                        .done(() => {
                            $div.css('backgroundColor', 'green');
                            console.log($div.css('left') + ' leftPosition');
                        });
                })
                .then(() => {
                    makeDef(0)
                        .done(() => {
                            $div.css('backgroundColor', 'blue');
                            console.log($div.css('left') + ' leftPosition');
                        });
                });

            /*Helpers*/
            function makeDef(leftPos) {
                let def:JQueryDeferred<JQuery> = $.Deferred();
                $div.animate({left: leftPos}, 1000, () => def.resolve());
                return def.promise();
            }
        },

        imgsLoad():void {
            let $imgs:JQuery = $('img');

            $imgs.each((index, elem) => {

                let $this:JQuery = $(elem),
                    $def:JQueryDeferred<JQuery|string> = $.Deferred();

                index += 1;

                $this.attr('src', 'img/' + index + '.jpg');

                $this
                    .one("load", () => $def.resolve('img ' + index + ' loaded'))
                    .error(() => console.log('error'));

                $def.then(
                    (result) => {
                        console.log(result); // "Stuff worked!"
                        $this.fadeIn(200);
                    },
                    (err) => console.log(err) // Error: "It broke");
                );
            });
        }
    };

    //Start all examples
    // Object.keys(Examples).forEach((prop) => {
    //     Examples[prop]();
    // });

    Examples.basic();
    Examples.slide();
    Examples.animation();
    Examples.seekAnimation();
})();

