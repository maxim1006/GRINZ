$(function() {

    var $arr = $('img.lazy'),
        $window = $(window),
        $windowHeightOnLoad = $window.height(),
        $windowScrollOnLoad = $window.scrollTop();



    setDefaultData($arr, $windowHeightOnLoad, $windowScrollOnLoad);



    $window.on('scroll.lazy', function() {
        var $this = $(this),
            windowScrollTop = $this.scrollTop();

        $arr.each(function(i, val) {
            var $this = $(this),
                $dataElemOffsetY = $this.data('offsetY');

            if ($this.data('isShown') === true) {
                return;
            } else if($dataElemOffsetY < $windowHeightOnLoad + windowScrollTop && $dataElemOffsetY >= windowScrollTop - $windowHeightOnLoad) {
                setDataShow($this, true);
                showImgSmooth($this, 500);
            }

        });

    });



    //helpers
    function showImgSmooth(img, timeOfShow) {
        var timeout;

        img.removeClass('lazy');

        timeout = setTimeout(function() {
            img
            .attr('src', img.data('lazy'))
                .addClass('lazy');
         }, timeOfShow);

    }


    function setDefaultData(img, $windowHeightOnLoad, $windowScrollOnLoad) {
        var i = 0;

        $arr.each(function(i, val) {
            var $this = $(this),
                rangeSum = $windowHeightOnLoad + $windowScrollOnLoad,
                rangeDiff = $windowScrollOnLoad - $windowHeightOnLoad;

            setDataShow($this, false);
            $this.data('offsetY',  $this.offset().top);

            if ($this.data('offsetY') < rangeSum && $this.data('offsetY') >= rangeDiff) {
                setDataShow($this, true);
                showImgSmooth($this, 500);
            }

        });
    }


    function setDataShow(obj, value) {
        obj.data('isShown', value);
    }


});