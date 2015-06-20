define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'makeNavActive',
    'text!templates/link3HTML.html'
    ], function($, _, Backbone, text, makeNavActive, link3HTML) {
      
        var link3View = Backbone.View.extend({
            el: $('#content'),
            render: function() {

                var compiledTemplate = _.template(link3HTML);
                
                this.$el.html(compiledTemplate);
                makeNavActive.init();
            }

        });

        return link3View;

});