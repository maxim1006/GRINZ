define([
    'jquery',
    'underscore',
    'backbone',
    ], function($, _, Backbone) {

    
        function init() {
            
            var $menu = $('#menu'),
            $menuItems = $menu.find('.nav__list-item'),
            $menuItemLink = $('#menu').find('a[href="'+window.location.hash+'"]');

            $menuItems.removeClass('nav__list-item_active');

            if($menuItemLink.length>0) {
                $menuItemLink.addClass('nav__list-item_active');
            } else {
                $menuItems.eq(0).addClass('nav__list-item_active');
            }

        }


        return {
            init: init
        };

});