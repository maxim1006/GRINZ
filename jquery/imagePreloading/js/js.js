$.fn.maxImagePreloader = function(options) {

    var arr = options.images;

    if ( !($.type(arr) === 'array' && arr.length > 0) ) return;

    var arrLength = arr.length,
        i = arrLength,
        defaults = {
            logs: true
        };

    var mainOptions = $.extend({}, defaults, options);

    var Preloader = {
        loadedImagesNumber: 0,

        init: function() {
            this.start();

            while (i--) {
                this.load(arr[i]);
            }
        },

        start: function() {
            //onStart
            if ( options.onStart ) {
                options.onStart();
            }
        },

        onStep: function() {
            if ( options.onStep ) {
                options.onStep.call(null, this, this.loadedImagesNumber, arrLength);
            }
        },

        onEnd: function() {
            if ( this.loadedImagesNumber === arrLength && options.onEnd) {
                options.onEnd();
            }
        },

        load: function(imgSrc) {
            var _this = this,
                image = new Image();

            image.src = imgSrc;

            $(image)
                .load(function() {
                    _this.loadedImagesNumber++;

                    _this.logSuccess();
                    _this.onStep();
                    _this.onEnd();
                })
                .error(function() {
                    _this.loadedImagesNumber++;

                    _this.logError();
                });
        },

        logSuccess: function() {
            if (mainOptions.logs) {
                console.log('Image ' + imgSrc + ' success');
            }
        },

        logError: function() {
            if (mainOptions.logs) {
                console.log('Image ' + imgSrc + ' error');
            }
        }

    };

    //init
    Preloader.init();
};

$(function() {
    var $preLoader = $('#maxImagePreloaderDefault'),
        $preLoaderText = $('#maxImagePreloaderDefault__loaderText');

    $(document).maxImagePreloader({
        onStart: function() {
            console.log('start');
        },
        onEnd: function() {
            $preLoader.hide();
            console.log('end');
        },
        onStep: function(img, imgNumber, imgsLength) {
            var percentage = Math.floor(100 * imgNumber / imgsLength);
            $preLoaderText.text(percentage + '%');
            /*console.log(img);
            console.log(imgNumber);
            console.log(imgsLength);*/
        },
        images: [
            "images/1.jpg",
            "images/2.gif",
            "images/3.jpg",
            "images/4.jpg",
            "images/5.gif",
            "images/6.jpg",
            "images/7.jpg",
            "images/8.jpg",
            "images/9.jpg",
            "images/10.jpg",
            "images/11.jpg",
            "images/12.jpg",
            "images/13.jpg",
            "images/14.jpg"
        ],
        logs: false
    });
});

