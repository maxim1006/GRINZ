define([
   'jquery',
   'underscore',
   'backbone',
   'router'
    ], function($, _, Backbone, Router) {

    var initialize = function() {
        Router.initialize();
    }; //end of initialize

    //возвращаю initialize, чтобы запустить require 
    return {
        initialize: initialize
    };
    

});