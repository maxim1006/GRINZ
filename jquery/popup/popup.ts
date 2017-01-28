"use strict";

/// <reference path="../../../node_modules/@types/jquery/index.d.ts" />

$.fn.popup = function (options = {}) {
    const TRANSITION_STR:string = 'transitionend webkitTransitionEnd oTransitionEnd';

    let defaults = {
    };

    let $page:JQuery = $('#page'),
        $body:JQuery = $('body'),
        scrollBarWidth:number = getScrollbarWidth();


    options = $.extend(defaults, options);

    return $.each(this, (idx, el) => {

        let $popupWrapper:JQuery = $(el);

        function init():void {
            initVars();
            bindEvents();
        }

        init();


        function initVars():void {
        }


        function bindEvents():void {
            $popupWrapper.on('click', onClick);
        }

        function onClick(e):void {
            let $target = $(e.target);

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
            setTimeout(() => $popupWrapper.addClass('_visible'), 0);
        }

        function instantShow() {
            $body.css({
                'overflow': 'hidden',
                'paddingRight': scrollBarWidth,
            });
            $popupWrapper.addClass('_show _visible');
        }

        function hide():void {
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

        function instantHide():void {
            $popupWrapper.removeClass('_visible _show');
            $body.css({
                'overflow': 'auto',
                'paddingRight': 0,
            });
        }


        /*Public API*/
        $popupWrapper.on('show', show);
        $popupWrapper.on('instantShow', instantShow);
        $popupWrapper.on('hide', hide);
        $popupWrapper.on('instantHide', instantHide);
        /*************/



    });



    /*Helpers*/
    function getScrollbarWidth():number {
        let scrollDiv, scrollbarWidth;

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
    /*********/



};

