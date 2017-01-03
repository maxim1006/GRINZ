"use strict";
(function () {
    var wrapper = document.querySelector('#wrapper'), wrapper1 = document.querySelector('#wrapperTimeout');
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (cb) {
            window.setTimeout(cb, 1000 / 60);
        };
    })();
    var elemsLength = 100, elem;
    while (elemsLength--) {
        elem = document.createElement('div');
        elem.classList.add('div');
        elem.style.top = elemsLength * 11 + 'px';
        wrapper.appendChild(elem);
        wrapper1.appendChild(elem.cloneNode());
    }
    var div = wrapper.querySelectorAll('.div');
    var div1 = wrapper1.querySelectorAll('.div');
    function go() {
        [].slice.call(div).forEach(function (el) {
            el.style.left = parseFloat(getComputedStyle(el).left) + 1 + 'px';
        });
    }
    function go1() {
        [].slice.call(div1).forEach(function (el) {
            el.style.left = parseFloat(getComputedStyle(el).left) + 1 + 'px';
        });
    }
    var fps = 60, then = Date.now(), interval = 1000 / fps, now, delta, requestAnimationFrameId;
    function animate() {
        requestAnimationFrameId = requestAnimationFrame(animate);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            go();
        }
    }
    function stopAnimate() {
        cancelAnimationFrame(requestAnimationFrameId);
    }
    var requestAnimationStartButton = document.querySelector('#requestAnimationStart'), requestAnimationStopButton = document.querySelector('#requestAnimationStop');
    requestAnimationStartButton.addEventListener('click', animate);
    requestAnimationStopButton.addEventListener('click', stopAnimate);
    var setTimeoutStartButton = document.querySelector('#setTimeoutStart'), setTimeoutStopButton = document.querySelector('#setTimeoutStop'), timeoutId;
    setTimeoutStartButton.addEventListener('click', startSetTimeout);
    setTimeoutStopButton.addEventListener('click', stopSetTimeout);
    function startSetTimeout() {
        timeoutId = setTimeout(function st() {
            go1();
            timeoutId = setTimeout(st, 1000 / 60);
        }, 1000 / 60);
    }
    function stopSetTimeout() {
        clearTimeout(timeoutId);
    }
})();
//# sourceMappingURL=js.js.map