$(function() {

    var $menuList = $('.menu__list'),
    $menuItems = $menuList.find('.menu__list-item'),
    $menuLinks = $menuList.find('.menu__link'),
    $menuListHeight = $menuList.outerHeight(),
    $leftArr = $('.arrow-top'),
    $htmlBody = $('html, body'),
    topOffset = 300, //the top offset when an arrow shows
    GAP = 10; //gap before link;

    var topsArr = makeTopsArr($menuLinks); //arr of top coords of headers


    // add/remove highlighting for nav items onscroll
    $(window).on('scroll', function() {
        var windowTop = $(this).scrollTop();
        
        highlightItem(windowTop);

        windowTop > topOffset ? $leftArr.show() : $leftArr.hide();

    });


    // add/remove highlighting for nav items onclick
    $menuList.on('click', '.menu__link', function(e) {
        var $this = $(this),
        $thisParent = $this.parent(),
        $target = $this.attr('href').slice(1),
        $targetID = $('#' + $target),
        coords;

        if ($thisParent.index() === 0) {
            scrollElem($htmlBody, 0, 1000);
        } else {
            coords = $targetID.offset().top - $this.outerHeight() - GAP;
            scrollElem($htmlBody, coords, 1000);
        }

        return false;
    });


    //added logic for arrow
    $leftArr.on('click', function() {
        scrollElem($htmlBody, 0, 1000);
    });



    /*helpers*/
    function makeTopsArr(objs) {
        var arr = [];

        objs.each(function(idx) { 

            var $this = $(this);
            //logic for the rest of the page
            if (idx !== 0) {            
               arr.push($('#' + $this.attr('href').slice(1)).offset().top - $this.outerHeight() - 2*GAP); //2*gap for better usability 
            }

        });

        return arr;
    }

    function highlightItem(winCoordsTop) {
        var length = topsArr.length, i=0;

        //logic for the top
        if (winCoordsTop <= topsArr[0]) {
            addRemoveClass($menuItems, 0)
            return false;
        }

        for (i; i<length; i++) {
            if (winCoordsTop >= topsArr[i]) {
                addRemoveClass($menuItems, i+1)         
            }
        }
    }

    function addRemoveClass(elem, idx) {
        elem
            .removeClass('menu__list-item_active')
                .eq(idx)
                    .addClass('menu__list-item_active');
    }

    function scrollElem(elem, coords, speed) {
        elem.animate({scrollTop: coords}, speed);
    }

});