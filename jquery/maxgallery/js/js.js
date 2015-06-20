(function($, undefined) {

    $.fn.maxGallery = function(options) {
        var defaults = {},
        $this = $(this);
        

        options = $.extend({}, defaults, options);


        //нахожу все картинки
        var length = $('.gallery').find('a').length;
        var href, arrOfImgs = [];
        for (var i = 0; i<length; i++) {
            href = $('.gallery')
                .find('a')
                    .eq(i)
                        .attr('href');

            arrOfImgs.push(href);

        }

        $(document)
        .on('click', '.gallery__item', function(e) {
            return false;
        });

        var Gallery = {
            id: null,
            title: '',
            init: function() {

                var _this = this;

                $(document)
                .on('click', '.gallery__item', function(e) {
                    var target = $(e.target).siblings('img');

                    _this.id = target.data('id');
                    _this.show(_this.id);
                    return false;
                })
                .on('click', '.slider__btn_next', function(e) {
                    _this.next();
                    e.preventDefault();
                })
                .on('click', '.slider__btn_prev', function(e) {
                    _this.prev();
                    e.preventDefault();
                })
                .on('click', '.slider__btn_close', function() {
                    _this.hide();
                })
                .on('keydown', function(e) {
                    if (!$this.is(':visible')) {
                        return;
                    } else if (e.which === 39) {
                        _this.next();
                    } else if (e.which === 37) {
                        _this.prev();
                    } else if (e.which === 27) {
                        _this.hide();
                    } else if (e.which === 38) {
                        this.id = length-1;
                        _this.prev(this.id);
                    } else if (e.which === 40) {
                        this.id = 0;
                        _this.prev(this.id);
                    }
                });

                $(window).on('hashchange', function() {
                    _this.updatestate();
                });

                _this.updatestate();

            },
            show: function(id) {
                $('.slider__cur-img').attr('src', arrOfImgs[id]);
                $this.show();
                this.setNum();
                this.setTitle();
                this.setHash();
            },
            next: function() {
                var id = arrOfImgs[this.id + 1] ? this.id + 1 : 0;
                this.id = id;
                $('.slider__cur-img').attr('src', arrOfImgs[id]);
                this.setNum();
                this.setTitle();
                this.setHash();
            },
            prev: function(idSet) {
                var id;

                if (idSet !== undefined) {
                    id = idSet;
                } else {
                    id = arrOfImgs[this.id - 1] ? this.id - 1 : arrOfImgs.length - 1;
                }

                this.id = id;
                $('.slider__cur-img').attr('src', arrOfImgs[id]);
                this.setNum();
                this.setTitle();
                this.setHash();
            },
            hide: function() {
                $this.hide();
                window.location.hash = '#closed';
            },
            setHash: function() {
                window.location.hash = '#img' + (this.id + 1);
            },
            setNum: function () {
                $('.slider__table-td-item-number').text(this.id+1 + '/' + length);
            },
            setTitle: function() {
                var title = $('.gallery__item').eq(this.id).find('img').data('title');
                $('.slider__table-td-item-title').text(title);
            },
            updatestate: function() {
                var id = location.hash.slice(4);
                if (isNaN(parseFloat(id))) {
                    this.hide();
                    return;
                } else {
                    this.id = +id - 1;
                    $('.slider__cur-img').attr('src', arrOfImgs[id]);
                    this.show(this.id);
                }
            }
        };
    
        Gallery.init();

    };

})(jQuery);

$(function() {
    $('.slider').maxGallery();
});