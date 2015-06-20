$(function() {

    var $field = $('#field'),
    $cells = $field.find('.field__cell'),
    $cover = $('#field__cover'),
    $btnAgain = $('#field__cover-menu-btn_again'),
    $btnNext = $('#field__cover-menu-btn_next'),
    $stageLevel = $('#field-header-level'),
    $score = $('#field-header-score');

    var i,
    START_STAGE = 3,
    WIDTH_OF_CELL = 100,
    VIEW_TIME = 2000, //time for cells remembering
    TIME_CELL_ROTATION = 800,
    SCORE = 0,
    timeoutInit, timeoutShowActiveCells, timeoutCover;

    var game = {
        stage: START_STAGE,
        correctCells: 0,
        arr: [],
        init: function(stage, action) {

            if (game.stage !== 3 && action !== 'repeat') {

                var i,
                l,
                append,
                str = '';

                switch (game.stage) {
                    case 4: //stage 2
                        l = 3;
                        append = true;
                        break;
                    case 5: //stage 3
                        l = 4;
                        append = false;
                        break;
                    case 6: //stage 4
                        l = 4;
                        append = true;
                        break;
                    case 7: //stage 5
                        l = 4;
                        append = true;
                        break;
                    case 8: //stage 6
                        l = 5;
                        append = false;
                        break;
                    case 9: //stage 7
                        l = 5;
                        append = true;
                        break;
                    case 10: //stage 8
                        l = 5;
                        append = false;
                        break;
                    case 11: //stage 9
                        l = 5;
                        append = true;
                        break;
                    case 12: //stage 10
                        l = 6;
                        append = true;
                        break;
                    case 13: //stage 11
                        l = 6;
                        append = false;
                        break;
                }

                if (append) {
                    //make proper number of cells
                    for (i=0; i<l; i++) {
                        str+='<div class="field__cell"><div class="front"></div><div class="back"></div></div>';
                    }

                    $field
                        .hide()
                            .css('width', l*WIDTH_OF_CELL)
                                .append(str)
                                    .show();
                }

            }

            var _this = this;

            _this.resetGame();

            var timeoutShow = setTimeout(function() {
                _this.showActiveCells($cells, game.arr);

                timeoutInit = setTimeout(function() {
                    _this.hideAciveCells();
                    _this.cellClick();
                }, 1.5*VIEW_TIME);

            }, 0.5*TIME_CELL_ROTATION);

        },
        setCells: function() {
            game.arr = [];
            //create arr with uniq numbers
            var cellsLength = $cells.length - 1; //arr starts from 0;
            while (game.arr.length < game.stage) {
                var a = getRandomInt(0, cellsLength);
                if (!isInArray(a, game.arr)) game.arr.push(a);
            }
        },
        showActiveCells: function($cells, arr) {
            var i,
            arrLength = arr.length;

            for (i = 0; i < arrLength; i++) {
                $cells
                    .eq(arr[i])
                        .addClass('field__cell_active');
            }
        },
        hideAciveCells: function() {
            $cells.removeClass('field__cell_active');
        },
        cellClick: function() {

            $field.on('click', '.field__cell', function() {

                var $this = $(this);

                if ($this.hasClass('field__cell_active')) return false;
                
                SCORE++;

                if (isInArray($this.index(), game.arr)) {
                    $this.addClass('field__cell_active');
                    game.correctCells++;

                    //set score
                    $score.text(SCORE*250);

                    //if all correct answers
                    if (game.correctCells === game.stage) {
                        $field.off('click');
                        timeoutCover = setTimeout(function() {
                            $cells.removeClass('field__cell_active field__cell_error');
                            $cover.addClass('field__cover_next');
                        }, 1.5*TIME_CELL_ROTATION);
                    }

                } else {
                    $field.off('click');

                    $this.addClass('field__cell_error');

                    //set a delay for displaying correct cells
                    timeoutShowActiveCells = setTimeout(function() {
                        game.showActiveCells($cells, game.arr);
                    }, TIME_CELL_ROTATION);

                    timeoutCover = setTimeout(function() {
                        $cells.removeClass('field__cell_active field__cell_error');
                        $cover.addClass('field__cover_error');
                    }, 3*TIME_CELL_ROTATION);
                }

            });

        },
        again: function() {
            var action = 'repeat';
            game.init(game.stage, action);
        },
        nextStage: function() {
            var action = 'next';
            game.stage++;
            game.init(game.stage, action);
            $stageLevel.text(game.stage - START_STAGE + 1);
        },
        resetGame: function() {
            $cells = $field.find('.field__cell');
            $cover.removeClass('field__cover_error field__cover_next');
            game.correctCells = 0;
            game.setCells();
            clearTimeout(timeoutInit);
            clearTimeout(timeoutShowActiveCells);
            clearTimeout(timeoutCover);
        }

    }; //end of game


    game.init();


    //try again
    $btnAgain.click(game.again);
    //next stage
    $btnNext.click(game.nextStage);



    /*helpers*/
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isInArray(val, arr) {
        var l = arr.length, i;
        for (i=0; i<l; i++) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    }


    //fastClick
    function FastClick(f,c){var g;c=c||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=c.touchBoundary||10;this.layer=f;this.tapDelay=c.tapDelay||200;if(FastClick.notNeeded(f)){return}function h(j,i){return function(){return j.apply(i,arguments)}}var b=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var e=this;for(var d=0,a=b.length;d<a;d++){e[b[d]]=h(e[b[d]],e)}if(deviceIsAndroid){f.addEventListener("mouseover",this.onMouse,true);f.addEventListener("mousedown",this.onMouse,true);f.addEventListener("mouseup",this.onMouse,true)}f.addEventListener("click",this.onClick,true);f.addEventListener("touchstart",this.onTouchStart,false);f.addEventListener("touchmove",this.onTouchMove,false);f.addEventListener("touchend",this.onTouchEnd,false);f.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){f.removeEventListener=function(j,l,i){var k=Node.prototype.removeEventListener;if(j==="click"){k.call(f,j,l.hijacked||l,i)}else{k.call(f,j,l,i)}};f.addEventListener=function(k,l,j){var i=Node.prototype.addEventListener;if(k==="click"){i.call(f,k,l.hijacked||(l.hijacked=function(m){if(!m.propagationStopped){l(m)}}),j)}else{i.call(f,k,l,j)}}}if(typeof f.onclick==="function"){g=f.onclick;f.addEventListener("click",function(i){g(i)},false);f.onclick=null}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);var deviceIsIOS4=deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled){return true}break;case"input":if((deviceIsIOS&&a.type==="file")||a.disabled){return true}break;case"label":case"video":return true}return(/\bneedsclick\b/).test(a.className)};FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case"textarea":return true;case"select":return !deviceIsAndroid;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return !a.disabled&&!a.readOnly;default:return(/\bneedsfocus\b/).test(a.className)}};FastClick.prototype.sendClick=function(b,c){var a,d;if(document.activeElement&&document.activeElement!==b){document.activeElement.blur()}d=c.changedTouches[0];a=document.createEvent("MouseEvents");a.initMouseEvent(this.determineEventType(b),true,true,window,1,d.screenX,d.screenY,d.clientX,d.clientY,false,false,false,false,0,null);a.forwardedTouchEvent=true;b.dispatchEvent(a)};FastClick.prototype.determineEventType=function(a){if(deviceIsAndroid&&a.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(a){var b;if(deviceIsIOS&&a.setSelectionRange&&a.type.indexOf("date")!==0&&a.type!=="time"){b=a.value.length;a.setSelectionRange(b,b)}else{a.focus()}};FastClick.prototype.updateScrollParent=function(b){var c,a;c=b.fastClickScrollParent;if(!c||!c.contains(b)){a=b;do{if(a.scrollHeight>a.offsetHeight){c=a;b.fastClickScrollParent=a;break}a=a.parentElement}while(a)}if(c){c.fastClickLastScrollTop=c.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(a){if(a.nodeType===Node.TEXT_NODE){return a.parentNode}return a};FastClick.prototype.onTouchStart=function(c){var a,d,b;if(c.targetTouches.length>1){return true}a=this.getTargetElementFromEventTarget(c.target);d=c.targetTouches[0];if(deviceIsIOS){b=window.getSelection();if(b.rangeCount&&!b.isCollapsed){return true}if(!deviceIsIOS4){if(d.identifier===this.lastTouchIdentifier){c.preventDefault();return false}this.lastTouchIdentifier=d.identifier;this.updateScrollParent(a)}}this.trackingClick=true;this.trackingClickStart=c.timeStamp;this.targetElement=a;this.touchStartX=d.pageX;this.touchStartY=d.pageY;if((c.timeStamp-this.lastClickTime)<this.tapDelay){c.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(a){var c=a.changedTouches[0],b=this.touchBoundary;if(Math.abs(c.pageX-this.touchStartX)>b||Math.abs(c.pageY-this.touchStartY)>b){return true}return false};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(a){if(a.control!==undefined){return a.control}if(a.htmlFor){return document.getElementById(a.htmlFor)}return a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(c){var e,d,b,g,f,a=this.targetElement;if(!this.trackingClick){return true}if((c.timeStamp-this.lastClickTime)<this.tapDelay){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=c.timeStamp;d=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){f=c.changedTouches[0];a=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)||a;a.fastClickScrollParent=this.targetElement.fastClickScrollParent}b=a.tagName.toLowerCase();if(b==="label"){e=this.findControl(a);if(e){this.focus(a);if(deviceIsAndroid){return false}a=e}}else{if(this.needsFocus(a)){if((c.timeStamp-d)>100||(deviceIsIOS&&window.top!==window&&b==="input")){this.targetElement=null;return false}this.focus(a);this.sendClick(a,c);if(!deviceIsIOS||b!=="select"){this.targetElement=null;c.preventDefault()}return false}}if(deviceIsIOS&&!deviceIsIOS4){g=a.fastClickScrollParent;if(g&&g.fastClickLastScrollTop!==g.scrollTop){return true}}if(!this.needsClick(a)){c.preventDefault();this.sendClick(a,c)}return false};FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(a){if(!this.targetElement){return true}if(a.forwardedTouchEvent){return true}if(!a.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(a.stopImmediatePropagation){a.stopImmediatePropagation()}else{a.propagationStopped=true}a.stopPropagation();a.preventDefault();return false}return true};FastClick.prototype.onClick=function(a){var b;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(a.target.type==="submit"&&a.detail===0){return true}b=this.onMouse(a);if(!b){this.targetElement=null}return b};FastClick.prototype.destroy=function(){var a=this.layer;if(deviceIsAndroid){a.removeEventListener("mouseover",this.onMouse,true);a.removeEventListener("mousedown",this.onMouse,true);a.removeEventListener("mouseup",this.onMouse,true)}a.removeEventListener("click",this.onClick,true);a.removeEventListener("touchstart",this.onTouchStart,false);a.removeEventListener("touchmove",this.onTouchMove,false);a.removeEventListener("touchend",this.onTouchEnd,false);a.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(b){var a;var c;if(typeof window.ontouchstart==="undefined"){return true}c=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(c){if(deviceIsAndroid){a=document.querySelector("meta[name=viewport]");if(a){if(a.content.indexOf("user-scalable=no")!==-1){return true}if(c>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(b.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(b,a){return new FastClick(b,a)};if(typeof define!=="undefined"&&define.amd){define(function(){return FastClick})}else{if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}};

    //fastClick init
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);

});

