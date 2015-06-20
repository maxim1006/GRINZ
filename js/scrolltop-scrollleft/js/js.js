(function(){

    var timer = 0;

    //pure JS
    id('container').addEventListener('scroll', function(){
        var _this = this;
        //this is for the throttling of the scroll events
        if (!timer) {
            timer = setTimeout(function() {
                var scrollPercentage = 100 * _this.scrollLeft / (_this.scrollWidth-_this.clientWidth);
                id('log').innerHTML = scrollPercentage.toFixed(2)+'%';
//                console.log(_this.scrollLeft);
//                console.log(_this.scrollWidth);
//                console.log(_this.clientWidth);
//                console.log(timer);
//                console.log(typeof timer);
                timer = 0;
            }, 50);
        }
    }, false);


    id('containerH').addEventListener('scroll', function(){
        var scrollPercentage = 100 * this.scrollTop / (this.scrollHeight-this.clientHeight);
        id('logH').innerHTML = scrollPercentage.toFixed(2)+'%';
    }, false);

    //jQuery
    $('#containerJquery').scroll(function(){
        var $this = $(this);
        var scrollPercentage = 100 * $this.scrollLeft() / ($('#containedJquery').width() - $this.width());
        $('#logJquery').html(scrollPercentage.toFixed(2)+'%');
//        console.log($(this).scrollLeft());
//        console.log($('#containedJquery').width());
//        console.log($(this).width());
    });

    $('#containerJqueryH').scroll(function(){
        var $this = $(this);
        var scrollPercentage = 100 * $this.scrollTop() / ($('#containedJqueryH').height() - $this.height());
        $('#logJqueryH').html(scrollPercentage.toFixed(2)+'%');
    });

    function id(string) {
        return document.getElementById(string);
    }

})();