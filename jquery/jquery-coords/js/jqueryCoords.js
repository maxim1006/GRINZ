$(function() {
    $('.box')
    .mousemove(function() {
        var $this = $(this);
        var offset = $this.offset();
        var position = $this.position();
        $('.offset-top').html('Позиция элемента относительно документа offset-top: ' + offset.top);
        $('.offset-left').html('Позиция элемента относительно документа offset-left: ' + offset.left);
        $('.position-top').html('Позиция элемента относительно позиции родителя position-top: ' + position.top);
        $('.position-left').html('Позиция элемента относительно позиции родителя position-left: ' + position.left);
    });

    $(document)
    .mousemove(function(evt) {
        $('.page-x').html('Координата мыши относительно всего документа pageX (кроссбраузерно): ' + evt.pageX);
        $('.page-y').html('Координата мыши относительно всего документа pageY (кроссбраузерно): ' + evt.pageY);
        $('.client-x').html('Координата мыши относительно видимой области clientX: ' + evt.clientX);
        $('.client-y').html('Координата мыши относительно видимой области clientY: ' + evt.clientY);
        $('.screen-x').html('Координата мыши относительно видимой области (включая панели браузера) screenX: ' + evt.screenX);
        $('.screen-y').html('Координата мыши относительно видимой области (включая панели браузера) screenY: ' + evt.screenY);
    })
    .on('resize', function() {
        var $this = $(this);
        $('.doc').html('Ширина и высота document: ' + $this.width() + ' x ' + $this.height());
    }).resize();

    $(window)
    .on('resize', function() {
        var $this = $(this);
        $('.window').html('Ширина и высота window: ' + $this.width() + ' x ' + $this.height());
    }).resize();

});