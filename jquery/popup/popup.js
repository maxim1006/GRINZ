"use strict";
$.fn.popup = function (options) {
    if (options === void 0) { options = {}; }
    var TRANSITION_STR = 'transitionend webkitTransitionEnd oTransitionEnd';
    var defaults = {};
    var $page = $('#page'), $body = $('body'), scrollBarWidth = getScrollbarWidth();
    options = $.extend(defaults, options);
    return $.each(this, function (idx, el) {
        var $popupWrapper = $(el);
        function init() {
            initVars();
            bindEvents();
        }
        init();
        function initVars() {
        }
        function bindEvents() {
            $popupWrapper.on('click', onClick);
        }
        function onClick(e) {
            var $target = $(e.target);
            if ($target.hasClass('jsPopupCancel') || $target.hasClass('popup__control')) {
                hide();
            }
        }
        function show() {
            $body.css({
                'overflow': 'hidden',
                'paddingRight': scrollBarWidth,
            });
            $popupWrapper.addClass('_show');
            setTimeout(function () { return $popupWrapper.addClass('_visible'); }, 0);
        }
        function instantShow() {
            $body.css({
                'overflow': 'hidden',
                'paddingRight': scrollBarWidth,
            });
            $popupWrapper.addClass('_show _visible');
        }
        function hide() {
            $popupWrapper.removeClass('_visible');
            $popupWrapper.on(TRANSITION_STR, function () {
                $popupWrapper.off(TRANSITION_STR);
                $popupWrapper.removeClass('_show');
                $body.css({
                    'overflow': 'auto',
                    'paddingRight': 0,
                });
            });
        }
        function instantHide() {
            $popupWrapper.removeClass('_visible _show');
            $body.css({
                'overflow': 'auto',
                'paddingRight': 0,
            });
        }
        $popupWrapper.on('show', show);
        $popupWrapper.on('instantShow', instantShow);
        $popupWrapper.on('hide', hide);
        $popupWrapper.on('instantHide', instantHide);
    });
    function getScrollbarWidth() {
        var scrollDiv, scrollbarWidth;
        scrollDiv = document.createElement("div");
        scrollDiv.style.width = '100px';
        scrollDiv.style.height = '100px';
        scrollDiv.style.overflow = 'scroll';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.className = "scroll-bar-measure";
        document.body.appendChild(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    }
};
//# sourceMappingURL=popup.js.map