/*
 * Show more jQuery plugin
 *
 * example of usage: $(object).showMore(options);
 *
 * options:

 value:      String, //string of text which will be used in view (default: object.text())
 wordwise:   Boolean, //cut by words or symbols (default: false)
 max:        Number, //number of symbols, (default: 10)
 tail:       String, //type of symbols in the clipped mode (default: '...')
 isFullMode: Boolean, //set mode by the default (default: true)
 title:      Boolean //show title in clipped mode (default: true)

 *
 *
 *
 * */

(function() {

    var CLIPPED = '_clipped';



    function ShowMore(options) {
        this.options = options;
        this.init();
    }

    ShowMore.prototype.init = function() {
        this.initVars();
        this.bindEvents();
        this.changeMode();
    };

    ShowMore.prototype.initVars = function() {
        this.$el = this.options.$el;
        this.initValue = this.options.value;
        this.isFullMode = !this.options.isFullMode;
        this.value = this.getValue();
    };

    ShowMore.prototype.changeMode = function() {
        this.isFullMode ? this.hide() : this.show();
    };

    ShowMore.prototype.show = function() {
        this.$el.removeClass(CLIPPED);
        this.isFullMode = true;
        this.setMode();

        if (this.options.title) {
            this.$el.removeAttr('title');
        }
    };

    ShowMore.prototype.hide = function() {
        this.$el.addClass(CLIPPED);
        this.isFullMode = false;
        this.setMode();

        if (this.options.title) {
            this.$el.attr('title', this.initValue);
        }
    };

    ShowMore.prototype.setMode = function() {
        if (this.isFullMode) {
            this.$el.text(this.initValue)
        } else {
            this.$el.text(this.value)
        }
    };

    ShowMore.prototype.getValue = function(value, wordwise, max, tail) {
        value = value || this.options.value;
        wordwise = wordwise || this.options.wordwise;
        max = max || this.options.max;
        tail = tail || this.options.tail;

        if (!value) return '';

        max = parseInt(max, 10);

        if (!max) return value;

        if (value.length <= max) return value;

        value = value.substr(0, max);

        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };

    ShowMore.prototype.bindEvents = function() {
        this.$el.on('click', this.changeMode.bind(this));
    };



        /*--------------Helpers--------------*/
        /*----------------------------------*/



    $.fn.showMore = function (options) {
        return this.each(function () {
            var obj = $(this);

            options = $.extend({
                $el: obj,
                value: obj.text(),
                wordwise: false,
                max: 10,
                tail: '...',
                isFullMode: true,
                title: true
            }, options);

            obj.data('showMore', new ShowMore(options))
        });
    };



    $(function() {

        var $showMoreBig = $('#showMoreBig'),
            $showMoreWordwiseAndTail = $('#showMoreWordwiseAndTail'),
            $showMoreSmall = $('#showMoreSmall');

        $showMoreSmall.showMore({
            max: 20
        });

        $showMoreBig.showMore({
            max: 40,
            isFullMode: false,
            title: false
        });

        $showMoreWordwiseAndTail.showMore({
            max: 30,
            wordwise: true,
            tail: '@@@'
        });

    });



})();