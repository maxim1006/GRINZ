(function() {

    $(function() {

        var $firstWrap = $('.wrap').eq(0),
        $secondWrap = $('.wrap').eq(1),
        jQueryInterval,
        velocityInterval;


        //jQuery approach
        $firstWrap.find('.btn-start').click(function() {
            jQueryInterval = setInterval(function() {
                $firstWrap.find('.circle').each(function() {
                    var randomNumberLeft = Math.floor(Math.random() * (94 + 1));
                    var randomNumberTop = Math.floor(Math.random() * (94 + 1));
                    $(this)
                        .animate({'left': randomNumberLeft + '%', 'top': randomNumberTop + '%'}, 1000);
                });
            }, 1000);
        });

        $firstWrap.find('.btn-stop').click(function() {
            $firstWrap.find('.circle').each(function() {
                clearInterval(jQueryInterval);
            });
        });


        //Velocity approach
        $secondWrap.find('.btn-start').click(function() {
            velocityInterval = setInterval(function() {
                $secondWrap.find('.circle').each(function() {
                    var randomNumberLeft = Math.floor(Math.random() * (94 + 1));
                    var randomNumberTop = Math.floor(Math.random() * (94 + 1));
                    $(this)
                        .velocity({'left': randomNumberLeft + '%', 'top': randomNumberTop + '%'}, 1000);
                });
            }, 1000);
        });

        $secondWrap.find('.btn-stop').click(function() {
            $secondWrap.find('.circle').each(function() {
                clearInterval(velocityInterval);
            });
        });




        
    });

})();