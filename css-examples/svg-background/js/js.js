$(function() {
    var $nav = $('#nav'),
    $layout = $('.content'),
    $loaderLayout = $('.content_loader'),
    $pages = $nav.find('span'),
    PAGE_NAME = "content",
    PAGE_NAME_START = PAGE_NAME + '-start.html',
    $loader = $('#loader'),
    $layoutInner = $('.layout-inner'),
    clickFlag = 0,
    TIME_OF_FADE = 230;

    
    //make XHR onload
    makeXHR(PAGE_NAME_START);


    //on nav click logic
    $nav.on('click touchstart', 'span', function() {
        var $this = $(this),
        idx = $this.index(),
        url = makeURL(idx);

        //constrain XHR if active elem
        if($pages.eq(idx).hasClass('active')) { return false; }

        //first page XHR
        if(idx === 0) url = PAGE_NAME_START;

        $this
            .siblings()
                .removeClass('active')
                    .end()
                        .addClass('active');

        //make XHR for other pages
        layoutXHR(url);
        
    });



    var timerSwip = 0;

    //swip logic
    $layout
    .on('mousedown touchstart', function(e) {
        e.preventDefault();
        e.type === 'touchstart' && (function(){e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];})();

        var posX = e.pageX,
        posY = e.pageY,
        $this = $(this),
        clickFlag = 1;

        if (clickFlag) {
            $this.on('mousemove touchmove', function(e) {
                
                //constrain number of XHR
                if (!timerSwip) {

                    e.preventDefault();
                    e.type === 'touchmove' && (function(){e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];})();

                    timerSwip = setTimeout(function() {

                        var posXnew = e.pageX,
                        posYnew = e.pageY,
                        $pagesLength = $pages.length,
                        $active = $nav.find('span.active'),
                        $activeIndex = $active.index(),
                        url,
                        diffX = posX - posXnew,
                        diffY = posY - posYnew;

                        $layout.scrollTop(diffY);

                        //repeat animation on edge
                        if (diffX < -200 && $activeIndex === 0 || diffX > 200 && $activeIndex === $pagesLength-1) {
                            repeatEdge($active, 'edge', 100);
                            $this.off('mousemove touchmove');
                        }
                            
                        if (diffX > 200 && $activeIndex < $pagesLength - 1) {
                              
                            url = makeURL($activeIndex+1);
                            
                            layoutXHR(url);
                            
                            $active
                                .removeClass('active')
                                    .next()
                                        .addClass('active');

                            $this.off('mousemove touchmove');

                        } else if (diffX < -200 && $activeIndex > 0) {
                            
                            url = $activeIndex === 1 ? PAGE_NAME_START : url = makeURL($activeIndex-1);

                            layoutXHR(url);

                            $active
                                .removeClass('active')
                                    .prev()
                                        .addClass('active');

                            $this.off('mousemove touchmove');

                        }

                        timerSwip = 0;
                    }, 100);
                }
                
            });
        }
    })
    .on('mouseleave mouseup touchend', function() {
        var $this = $(this);
        clickFlag = 0;
        $this.off('mousemove touchmove');
    });


    //right & left arrow keys logic
    var timerClick = 0;

    $(document)
    .on('keydown', function(e) {

        //constrain number of XHR
        if (!timerClick) {
            var $pagesLength = $pages.length,
            $active = $nav.find('span.active'),
            $activeIndex = $active.index(),
            url;

            timerClick = setTimeout(function() {
                
                if (e.which === 39 && $activeIndex < $pagesLength - 1) {
                      
                    url = makeURL($activeIndex+1);
                    
                    layoutXHR(url);

                    $active
                        .removeClass('active')
                            .next()
                                .addClass('active');

                } else if (e.which === 37 && $activeIndex > 0) {
                    url = $activeIndex === 1 ? PAGE_NAME_START : url = makeURL($activeIndex-1);

                    layoutXHR(url);

                    $active
                        .removeClass('active')
                            .prev()
                                .addClass('active');
                }

                if ($activeIndex === 0 && e.which === 37 || $activeIndex === $pagesLength-1 && e.which === 39) {
                    repeatEdge($active, 'edge', 100);
                }

                timerClick = 0;

            }, 500);
        }

    });

    
    //container height logic
    var resizeTimer = 0;
    $(window).on('resize', function() {

        if(!resizeTimer) {

            resizeTimer = setTimeout(function() {
                var $this = $(this),
                height = $this.height(),
                $layouts = $layout.add($loaderLayout);
                
                if (height > 720) $nav.css({'top': '665px', 'bottom': 'auto'});

                if (height > 600) {
                    $layoutInner.removeClass('fix-back-600');
                    $layouts.removeClass('fix-600');
                }

                if (height < 850 && height > 830) {
                    $layouts.css('height', '62%');
                } else if (height < 830 && height >= 780)  {
                    $layouts.css('height', '67%');
                } else if (height < 780 && height >= 740) {
                    $layouts.css('height', '68%');
                } else if (height < 740 && height >= 720) {
                    $layouts.css('height', '70%');
                } else if (height < 720 && height >= 600) {
                    $layouts.css('height', '70%');
                    $nav.css({'top': 'auto', 'bottom': '0'});
                } else if (height < 600) {
                    $layoutInner.addClass('fix-back-600');
                    $layouts.addClass('fix-600');
                    $nav.css({'top': 'auto', 'bottom': '0'});
                }

                resizeTimer = 0;
            }, 100);

        }
        

    }).resize();


    /*helpers*/
    function makeURL(idx) {
        return PAGE_NAME + idx + '.html';
    }

    function makeXHR(url) {
        $.ajax({
            url: url,
            dataType: 'html',
            beforeSend: function() {
                $loader.fadeIn(TIME_OF_FADE);
            }
        })
        .then(
            function(data) {
                $loader
                    .fadeOut(TIME_OF_FADE)
                        .promise()
                            .done(function(){
                                $layout
                                    .html(data)
                                        .fadeIn(TIME_OF_FADE);

                                        /*IF IE*/
                                        if ((/Trident\/7\./).test(navigator.userAgent)) {
                                            $('.h1').css('font-family', 'Georgia');
                                        }
                            });
            },
            function() {
                $layout
                    .fadeIn(TIME_OF_FADE)
                        .text('Sorry, an error occured, please try again later...');
            }
        );
    }

    function layoutXHR(url) {
        $layout
            .fadeOut(TIME_OF_FADE)
                .promise()
                    .done(function(){
                        makeXHR(url);
                    });
    }

    function repeatEdge(elem, cl, time) {
        elem.removeClass(cl);
        var edgeTimer = setTimeout(function() {
            elem.addClass(cl);
            clearTimeout(edgeTimer);
        }, time);
    }

});



