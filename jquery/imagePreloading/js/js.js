$.fn.maxImagePreloader = function(options) {

    var arr = options.images;

    if ( !($.type(arr) === 'array' && arr.length > 0)  ) return;

    var arrLength = arr.length,
        i = arrLength,
        defaults = {
            logs: true,
            loader: '<div id="maxImagePreloaderDefault" style="display: none">' +
                    '<div id="maxImagePreloaderDefault__cover">' +
                    '<div id="maxImagePreloaderDefault__content">' +
                    '<div id="maxImagePreloaderDefault__spinner"></div>' +
                    '<div id="maxImagePreloaderDefault__loaderText"></div>' +
                    '</div></div></div>'
        };

    var mainOptions = $.extend({}, defaults, options);



    var Preloader = {
        loadedImagesNumber: 0,

        init: function() {

            this.setHTML();
            this.setVars();
            this.show();

            while (i--) {
                this.load(arr[i]);
            }
        },

        setHTML: function() {
            if ( !options.loader ) {
                $('body')
                    .append(defaults.loader);

                this.defaultLoader = $('#maxImagePreloaderDefault');
            }
        },

        setVars: function () {
            this.loader = options.loader || this.defaultLoader;
            this.spinner = options.spinner || this.defaultLoader.find('#maxImagePreloaderDefault__spinner');
            this.loaderText = options.loaderText || this.defaultLoader.find('#maxImagePreloaderDefault__loaderText');
            this.loaderContent = options.loaderText || this.defaultLoader.find('#maxImagePreloaderDefault__content');
        },

        hide: function() {
            this.loader.hide();
        },

        show: function() {
            //onStart
            if ( options.onStart ) {
                options.onStart();
            }

            this.loader.show();
        },

        showPercent: function(loadedImagesNumber) {
            var percentage = Math.floor(100 * loadedImagesNumber / arrLength);

            this.loaderText.text(percentage + '%');
        },

        load: function(imgSrc) {
            var _this = this,
                image = new Image();

            image.src = imgSrc;

            $(image)
                .load(function() {
                    _this.loadedImagesNumber++;
                    _this.showPercent(_this.loadedImagesNumber);

                    if (mainOptions.logs) {
                        console.log('Image ' + imgSrc + ' success');
                    }

                    //onStep
                    if ( options.onStep ) {
                        options.onStep.call(null, this, _this.loadedImagesNumber);
                    }

                    //onEnd
                    if ( _this.loadedImagesNumber === arrLength) {

                        if (options.onEnd) options.onEnd();

                        _this.hide();
                    }
                })
                .error(function() {
                    if (mainOptions.logs) {
                        console.log('Image ' + imgSrc + ' error');
                    }
                });
        }

    };

    //init
    Preloader.init();
};

$(function() {
    var $imgWrapper = $('.img__wrapper');

    $(document).maxImagePreloader({
        onStart: function() {
            console.log('start');
        },
        onEnd: function() {
            console.log('end');
            $imgWrapper.show();
        },
        onStep: function(img, imgNumber) {
            console.log(img);
            console.log(imgNumber);
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
        logs: true
    });
});

