(function($, undefined) {
    jQuery.fn.maxCarousel = function(options) {

        var defaults = {
            animation: {
                animationMargins: false, //вид анимации: анимированные margins
                animationVisibility: false //анимированные переходы при прокрутке
            },
            rolledElements: 1
        };

        options = $.extend({}, defaults, options);//первый пустой объект нужен для того, чтобы пользователь мог вызвать 
        //метод с дефолтными настройками, после того, как указал какие-то опции.

        /*определяю объект к которому необходимо прикрепить карусель*/
        var $this = $(this);

        return $this.each(function() {
            /*необходимо для инициализации каждой карусели*/
            var $this = $(this);
            var $list,
            $item,
            $itemWidth,
            $listLength,
            $leftArrow,
            $rightArrow,
            $mainParent,
            $visibleElements,//количество видимых элементов
            currentPosition = 0, // текущая позиция карусели
            currentItem = 0,//счетчик текущей позиции, с помощью которого определяю параметры для прокрутки
            listPositionX, //позиция карусели по х (нужно для перетаскивания)
            listCurrentPosition = 0, //позиция карусели по х (нужно для перетаскивания) для offset
            listPositionDiff = 0,//разница между координатами мыши, нужна чтобы узнать в какую сторону крутить карусель 
            listCurrentPageX, //позиция курсора на mousedown нужно для проверки перетаскивания
            pullPositionUp = 0, //позиция курсора при mouseup, для проверки двинули ли карусель или просто нажали
            rollItems = options.rolledElements; //количество прокручиваемых элементов

            var carousel = {
                init: function() {
                    this.updateVars();
                    this.bindEvent();
                },
                updateVars: function() {
                    $mainParent = $this;
                    $list = $('ul', $mainParent);
                    $item = $('ul li', $mainParent);
                    $listLength = $item.length;
                    $itemWidth = $item.outerWidth(true);
                    $leftArrow = $('.maxcarousel__l-arr', $mainParent);
                    $rightArrow = $('.maxcarousel__r-arr', $mainParent);
                },
                bindEvent: function() {
                    /*Минимальная ширина всей карусели (wrapper)*/
                    $mainParent.css({'min-width': $item.eq(0).outerWidth(true) +
                    $leftArrow.outerWidth(true) + $rightArrow.outerWidth(true)});

                    /*Максимальная ширина всей карусели (wrapper)*/
                    var maxCarouselWidth = $item.eq(0).outerWidth(true)*$listLength +
                    $leftArrow.outerWidth(true) + $rightArrow.outerWidth(true);

                    $mainParent.css({'max-width': maxCarouselWidth});

                    /*Отключаю левую кнопку в самом начале*/
                    if (currentItem === 0) {
                        addDisabled($leftArrow);
                    }

                    this.leftClick();
                    this.rightClick();
                    this.scrollUser();
                    this.resize();
                },
                leftClick: function() {
                    /*События на левом клике*/
                    $leftArrow.on('click touchstart', function() {

                        /*В процессе анимации отключаю клики*/
                        if ($item.is(':animated')) { return false; }

                        /*отключаю анимацию для маргинов*/
                        $item.stop(true, true);

                        /*если видимых элементов столько же сколько их всего*/
                        if ($visibleElements >= $listLength) {
                            addDisabled($leftArrow);
                            addDisabled($rightArrow);
                            return false;
                        }

                        removeDisabled($rightArrow);

                        /*Если список в самом начале или у левой кнопки класс disabled, 
                        или показаны все элементы отключаю левую кнопку*/
                        if ( $(this).hasClass('disabled') || currentItem <= 0  || $visibleElements >= $listLength) {
                            addDisabled($leftArrow);
                            return false;
                        }

                        /*Слежу за номером элемента при сдвиге влево*/
                        currentItem -= rollItems;

                        /*Высчитываю позицию элемента при клике на левую стрелку*/
                        currentPosition += $itemWidth*rollItems;
                        $list.stop();
                        $list.animate({ left: currentPosition }, function() {
                            if(currentItem <= 0) {
                                currentItem = 0;
                                currentPosition = 0;
                                addDisabled($leftArrow);
                                $list.animate({ left: currentPosition });
                            }
                        });

                        /*Запуск кастомной анимации*/
                        if (options.animationMargins) {
                            animateMargin($item, 'margin-left', 50);
                        }

                        if (options.animationVisibility) {
                            animateVisiability($item);
                        }

                    });
                },
                rightClick: function() {
                    /*События на правом клике*/
                    $rightArrow.on('click touchstart', function() {
                        /*В процессе анимации отключаю клики*/
                        if ($item.is(':animated')) { return false; }

                        /*отключаю анимацию для маргинов*/
                        $item.stop(true, true);

                        removeDisabled($leftArrow);

                        /*если видимых элементов столько же сколько их всего*/
                        if ($visibleElements >= $listLength) {
                            addDisabled($leftArrow);
                            addDisabled($rightArrow);
                            return false;
                        }

                        /*Проверка на конечный элемент*/
                        if ( ($listLength - $visibleElements) <= currentItem ) {
                            addDisabled($rightArrow);
                            removeDisabled($leftArrow);
                            return false;
                        } else {
                            /*Слежу за номером элемента при сдвиге вправо*/
                            currentItem += rollItems;
                            /*Высчитываю позицию элемента при клике на правую стрелку*/
                            currentPosition -= $itemWidth*rollItems;
                            $list.stop();
                            $list.animate({ left: currentPosition }, function() {
                                if(($listLength - $visibleElements) <= currentItem) {
                                    currentItem = $listLength - $visibleElements;
                                    addDisabled($rightArrow);
                                    currentPosition = -(currentItem)*$itemWidth;
                                    $list.animate({ left:  currentPosition });
                                }
                            });
                        }

                        /*Отключаю правую кнопку на конечном эелементе*/
                        if ( ($listLength - $visibleElements) <= currentItem ) {
                            addDisabled($rightArrow);
                        }

                        /*Запуск кастомной анимации*/
                        if (options.animationMargins) {
                            animateMargin($item, 'margin-right', 30);
                        }

                        if (options.animationVisibility) {
                            animateVisiability($item);
                        }
                        
                    });
                },
                scrollUser: function() {
                    /*При перетаскивании*/
                    $list.on('mousedown touchstart', function(evt) {
                        /*отключаю скролл на ios устройствах*/
                        evt.preventDefault();
                        evt.type === 'touchstart' && (function(){evt = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];})();

                        listCurrentPageX = evt.pageX;

                        //добавляю класс к карусели, чтобы отследить mousedown
                        $list.addClass('listMouseDown');
                        listCurrentPosition = $(this).position().left;

                        if( $list.hasClass('listMouseDown')) {
                            /*двигаю карусель вслед за курсором*/
                            $(this).on('mousemove touchmove', function(evt) {
                                /*отключаю скролл на ios устройствах*/
                                evt.preventDefault();
                                evt.type === 'touchmove' && (function(){evt = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];})();

                                var pullPositionMove = evt.pageX;
                                listPositionX = listCurrentPosition - (listCurrentPageX - pullPositionMove);
                                $list.animate({ left: listPositionX }, 0);

                                listPositionDiff = listCurrentPageX - pullPositionMove;
                            });
                        }

                        /*При уходе курсора с карусели*/
                        $list.on('mouseleave', function() {
                            var $this = $(this);
                            $this.stop( true, true );
                            $this.off('mousemove touchmove');
                        });
                    });

                    $list.on('mouseup', function() {
                        $list.stop( true, true );
                        $list.off('mousemove mouseleave touchmove');
                    });

                    /*При mouseup на документе*/
                    $(document).on('mouseup touchend', function(evt) {
                        /*отключаю скролл на ios устройствах*/
                        evt.preventDefault();

                        pullPositionUp = evt.pageX;

                        //при наличии перетаскивания 
                        if(listCurrentPageX === pullPositionUp) {
                            $list.removeClass('listMouseDown');
                            return false;
                        }

                        //при наличии mousedown
                        if( $list.hasClass('listMouseDown') ) {

                            $list.stop( true, true );
                            $list.off('mousemove mouseleave touchmove');

                            var listPositionDiffIndex = Math.abs( Math.round(listPositionDiff / $itemWidth) );

                            if( listPositionDiff < 0 ) { //прокрутка влево

                                /*Проверка на конечный элемент слева*/
                                if(currentItem <= 0 || (listPositionDiff < currentPosition) )  {
                                    currentItem = currentPosition = 0;
                                    addDisabled($leftArrow);
                                    removeDisabled($rightArrow);
                                } else {
                                    currentPosition += listPositionDiffIndex*$itemWidth;
                                    currentItem -= listPositionDiffIndex; //количество передвинутых блоков при прокручивании влево
                                    removeDisabled($rightArrow);
                                }

                            } else {//прокрутка вправо
                                /*Проверка на конечный элемент справа*/
                                if ( ($listLength - $visibleElements) <= currentItem ) {
                                    currentItem = $listLength - $visibleElements;
                                    addDisabled($rightArrow);
                                    removeDisabled($leftArrow);
                                    currentPosition = -currentItem*$itemWidth;
                                } else {
                                    currentPosition -= listPositionDiffIndex*$itemWidth;
                                    currentItem += listPositionDiffIndex;
                                    removeDisabled($leftArrow);
                                    removeDisabled($rightArrow);
                                    if ( ($listLength - $visibleElements) <= currentItem) {
                                        currentItem = $listLength - $visibleElements;
                                        addDisabled($rightArrow);
                                        removeDisabled($leftArrow);
                                        currentPosition = -currentItem*$itemWidth;
                                    }
                                }

                            }
                            $list.animate({ left: currentPosition }, 100, function() {
                                $list.removeClass('listMouseDown');
                            });
                        }
                    });
                },
                resize: function() {
                    $(window).on('resize', function() {

                        /*Рассчитываю ширину главного родителя без стрелок*/
                        var $parentWidthNoArrows = $mainParent.outerWidth(true) -
                        $leftArrow.outerWidth(true) - $rightArrow.outerWidth(true);

                        /*Рассчитываю количество видимых элементов*/
                        $visibleElements = Math.floor($parentWidthNoArrows / $item.eq(0).outerWidth(true));

                        /*условие для уменьшение карусели, но до 1 элемента и ограничение на увеличение видимых элементов больше
                        чем эелементов списка*/
                        if ($visibleElements === 0) {
                            $visibleElements = 1;
                        } else if ($visibleElements > $listLength) {
                            $visibleElements = $listLength;
                        }

                        /*Расcчитываю ширину непосредственного родителя*/
                        var $parentWidth = $visibleElements * $item.eq(0).outerWidth(true);
                        $list.parent().css({
                            'width': $parentWidth,
                            'min-width': $item.eq(0).outerWidth(true),
                            'max-width': $item.eq(0).outerWidth(true)*$visibleElements
                        });

                        /*отключаю правую и левую кнопку, когда количество элементов в списке = количеству видимых элементов*/
                        if ($visibleElements >= $listLength) {
                            addDisabled($rightArrow);
                            addDisabled($leftArrow);
                        } else {
                            removeDisabled($rightArrow);
                        }

                        /*при увеличении/уменьшении карусели сбрасываю все параметры*/
                        currentItem = 0;
                        currentPosition = 0;
                        $list.css({'left': 0});
                        addDisabled($leftArrow);
                    });

                    /*Отменяю выделение*/
                    $mainParent.attr('unselectable','on')
                        .css({
                            '-moz-user-select':'none',
                            '-o-user-select':'none',
                            '-khtml-user-select':'none',
                            '-webkit-user-select':'none',
                            '-ms-user-select':'none',
                            'user-select':'none'
                        }).on('selectstart', function(){ return false; });

                    $(window).resize();
                }
            };

            /*helpers functions*/
            function addDisabled(item) {
                item.addClass('is-disabled');
            }

            function removeDisabled(item) {
                item.removeClass('is-disabled');
            }

            function animateMargin(items, side, value) {
                items.stop(true, true); //останавливаю анимацию
                var w = items.eq(0).outerWidth(), //узнаю маргин для элемента
                w1 = items.eq(0).outerWidth(true),
                dif = (w1-w)/2;
                var anim = {};
                var anim1 = {};
                anim1[side] = dif;
                anim[side] = dif + value;

                items.animate(anim, 300).animate(anim1, 300);
            }

            function animateVisiability(items) {
                items.stop(true, true); //останавливаю анимацию
                items.animate({'opacity': 0}, 200).delay(200).animate({'opacity': 1}, 500);
            }
                
            carousel.init();

        });

    };//end of maxCarousel

})(jQuery);

$('.maxcarousel').maxCarousel({rolledElements: 1});


