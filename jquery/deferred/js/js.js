var Examples = (function() {

    $('.example-link').on('click', function(e) {
        e.preventDefault();
    });

    var Examples = {};

    Examples.basic = (function() {
        var $def = $.Deferred();

        //прописываю то что надо сделать когда наступит состояние
        //готово или ошибка
        $def.done(function() {console.log('resolved');});
        $def.fail(function() {console.log('rejected');});

        //указываю когда наступает resolve или reject
        $("#btnResolve").click(function(){ $def.resolve(); });
        $("#btnReject").click(function(){ $def.reject(); });
        $("#btnReport").click(function(){ console.log($def.state()); });
    })();

    Examples.slide = (function() {
        var a1 = $.Deferred(),
            a2 = $.Deferred();

        $('#slide1').click(function(){
            $(this).slideUp(1000, a1.resolve);
        });

        $('#slide2').click(function(){
            $(this).slideUp(2000, a2.resolve);
        });

        a1.done(function() {
            console.log('#slide1 resolved');
        });

        a2.done(function() {
            console.log('#slide2 resolved');
        });

        $.when(a1, a2)
            .then(function(){console.log('both done'); return 3;})
            .done(
                function(a){
                    setTimeout(function(){
                        console.log(a + ' arbitrary variable');
                        console.log('after 2s both done');
                    }, 2000);
                }
            )
    })();

    Examples.funcTest = function() {
        function test() {
            var d = $.Deferred();
            setTimeout(function() { d.resolve(); }, 3000);
            return d.promise();
        }
        var t = test().done(function() { console.log('timeout');});
    };

    Examples.animation = (function() {
        $( ".animation__btn" ).on( "click", function() {
            $( ".animation__par" ).append( "Started..." );

            $( ".animation__div" ).each(function( i ) {
                $( this ).fadeIn().fadeOut( 1000 * ( i + 1 ) );
            });

            $( ".animation__div" ).promise().done(function() {
                $( ".animation__par" ).append( " Finished! " );
            });
        });
    })();

    Examples.seekAnimation = (function() {
        function seekAnimation() {
            return $( ".seek-animation__div" ).fadeIn( 800 ).delay( 1200 ).fadeOut();
        }

        $( ".seek-animation__btn" ).on( "click", function() {
            $( ".seek-animation__par" ).append( " Started... " );

            $.when( seekAnimation() ).done(function() {
                $( ".seek-animation__par" ).append( " Finished! " );
            });
        });
    })();

    Examples.then = function() {
        function makeDeferred() {
            return $.getJSON('json.json');
        }

        function makeDeferred1() {
            return $.getJSON('json1.json');
        }

        makeDeferred().then(
            function(data) {
                console.log(data);
            },
            function() {
                console.log("something went wrong");
            }
        );

        makeDeferred1().then(
            function(data) {
                console.log(data);
            },
            function() {
                console.log("something went wrong");
            }
        );
    };

    Examples.chaining = function() {
        var $div = $('.chaining__div');
        function makeDef(leftPos) {
            var def = $.Deferred();
            $div.animate({left: leftPos}, 1000, function(){def.resolve();});
            return def.promise();
        }
        makeDef(200)
            .then(function() {
                $div.css('backgroundColor', 'red');
                console.log($div.css('left') + ' leftPosition');
            })
            .then(function() {
                makeDef(400)
                    .done(function () {
                        $div.css('backgroundColor', 'purple');
                        console.log($div.css('left') + ' leftPosition');
                    });
            })
            .then(function() {
                makeDef(600)
                    .done(function() {
                        $div.css('backgroundColor', 'yellow');
                        console.log($div.css('left') + ' leftPosition');
                    });
            })
            .then(function() {
                makeDef(800)
                    .done(function() {
                        $div.css('backgroundColor', 'green');
                        console.log($div.css('left') + ' leftPosition');
                    });
            })
            .then(function() {
                makeDef(0)
                    .done(function() {
                        $div.css('backgroundColor', 'blue');
                        console.log($div.css('left') + ' leftPosition');
                    });
            });
    };

    Examples.imgsLoad = function() {
        var $imgs = $('img');

        $imgs.each(function(index, elem) {
            var $this = $(this);
            index += 1;
            var $def = $.Deferred();

            $this.attr('src', 'img/' + index + '.jpg');

            $this.one("load", function() {
                $def.resolve('img ' + index + ' loaded');
            }).error(function(){
                    console.log('error');
                });

            $def.then(function(result) {
                console.log(result); // "Stuff worked!"
                $this.fadeIn(200);
            }, function(err) {
                console.log(err); // Error: "It broke"
            });
        });
    };

    return Examples;
})();