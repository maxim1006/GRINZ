$(function() {

    var $popup,
    $popupInner,
    $btnOpen,
    $btnClose;

    function init() {
        updateVars();
        bindEvents();
    }

    function updateVars() {
        $btnOpen = $('.js-popup-open-btn');
        $btnClose = $('.js-popup-close-btn');
        $popup = $('.popup-overlay');
        $popupInner = $('.popup-overlay').find('.popup');
    }

    function bindEvents() {
        $btnOpen.on('click', function() {
            $popup.show();
            return false;
        });

        $btnClose.on('click', function() {
            $popup.hide();
            return false;
        });

        $(document).on('click', function(e) {
            var $target = $(e.target);

            if(!$target.is($popupInner) && $popupInner.has($target).length === 0) {
                $popup.hide();
            }
        });
    }

    init();

});