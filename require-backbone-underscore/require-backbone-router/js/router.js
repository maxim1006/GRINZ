define([
   'jquery',
   'underscore',
   'backbone',
   'views/navView',
   'views/homeView',
   'views/link1View',
   'views/link2View',
   'views/link3View',
    ], function($, _, Backbone, NavView, homeView, link1View, link2View, link3View) {

    var Router = Backbone.Router.extend({
      routes: {
        "": "home",
        "work": "work",
        "family": "family",
        "contact": "contact"
      }
    });

    var initialize = function() {

        var navView = new NavView();
        navView.render();


        var router = new Router();

        router.on("route:home", function() {
          var homeV = new homeView();
          homeV.render();
        });

        router.on("route:work", function() {
          var link1V = new link1View();
          link1V.render();
        });

        router.on("route:family", function() {
          var link2V = new link2View();
          link2V.render();
        });

        router.on("route:contact", function() {
          var link3V = new link3View();
          link3V.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };


});