define([
   'jquery',
   'underscore',
   'backbone',
   'views/listView'
    ], function($, _, Backbone, listView) {

    var initialize = function() {
        listView.listView();
    }; //end of initialize

    //возвращаю initialize, чтобы запустить require 
    return {
        initialize: initialize
    };
    

});