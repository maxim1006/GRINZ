"use strict";

(function () {

    let wrapper: Element = document.querySelector('#wrapper'),
        wrapper1: Element = document.querySelector('#wrapperTimeout');


    /*PolyFill*/
    window.requestAnimFrame = (function (): any {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (cb: () => any) {
                window.setTimeout(cb, 1000 / 60);
            };
    })();
    /*************/


    let elemsLength = 100,
        elem;

    while (elemsLength--) {
        elem = document.createElement('div');
        elem.classList.add('div');
        elem.style.top = elemsLength * 11 + 'px';

        wrapper.appendChild(elem);
        wrapper1.appendChild(elem.cloneNode());
    }

    let div: NodeList = wrapper.querySelectorAll('.div');
    let div1: NodeList = wrapper1.querySelectorAll('.div');

    function go(): void {
        [].slice.call(div).forEach((el) => {
            el.style.left = parseFloat(getComputedStyle(el).left) + 1 + 'px';
        });
    }

    function go1(): void {
        [].slice.call(div1).forEach((el) => {
            el.style.left = parseFloat(getComputedStyle(el).left) + 1 + 'px';
        });
    }


    /*Анимация с помощью requestAnimationFrame*/
    let fps = 60,
        then = Date.now(),
        interval = 1000 / fps,
        now, delta, requestAnimationFrameId;

    function animate() {
        requestAnimationFrameId = requestAnimationFrame(animate);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            // update time stuffs

            // Just `then = now` is not enough.
            // Lets say we set fps at 10 which means
            // each frame must take 100ms
            // Now frame executes in 16ms (60fps) so
            // the loop iterates 7 times (16*7 = 112ms) until
            // delta > interval === true
            // Eventually this lowers down the FPS as
            // 112*10 = 1120ms (NOT 1000ms).
            // So we have to get rid of that extra 12ms
            // by subtracting delta (112) % interval (100).
            // Hope that makes sense.

            then = now - (delta % interval);

            go();
        }
    }

    function stopAnimate():void {
        cancelAnimationFrame(requestAnimationFrameId);
    }


    let requestAnimationStartButton: Element = document.querySelector('#requestAnimationStart'),
        requestAnimationStopButton: Element = document.querySelector('#requestAnimationStop');

    requestAnimationStartButton.addEventListener('click', animate);
    requestAnimationStopButton.addEventListener('click', stopAnimate);



//    (function animloop(){
//        requestAnimFrame(animloop);
//        go();
//    })();
    /**********************************************/



    /*Анимация с помощью setTimeout*/
    let setTimeoutStartButton: Element = document.querySelector('#setTimeoutStart'),
        setTimeoutStopButton: Element = document.querySelector('#setTimeoutStop'),
        timeoutId: number;

    setTimeoutStartButton.addEventListener('click', startSetTimeout);
    setTimeoutStopButton.addEventListener('click', stopSetTimeout);

    function startSetTimeout():void {
        timeoutId = setTimeout(function st() {
            go1();
            timeoutId = setTimeout(st, 1000 / 60);
        }, 1000 / 60);
    }

    function stopSetTimeout():void {
        clearTimeout(timeoutId);
    }
    /********************************/

})();
