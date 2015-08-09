$(function() {
    $('.page').on('click', function(e) {
        console.log('e.target: %o', $(e.target));
        console.log('this: %o', $(this));
        console.log('e.currentTarget: %o', $(e.currentTarget));
        console.log('e.delegateTarget: %o', $(e.delegateTarget));
    });
});