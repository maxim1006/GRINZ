define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'makeNavActive',
    'text!templates/homeHTML.html'
    ], function($, _, Backbone, text, makeNavActive, homeHTML) {
      
        var homeView = Backbone.View.extend({
            el: $('#content'),
            render: function() {

                var compiledTemplate = _.template(homeHTML);
                
                this.$el.html(compiledTemplate);
                makeNavActive.init();
            }

        });

        return homeView;

});