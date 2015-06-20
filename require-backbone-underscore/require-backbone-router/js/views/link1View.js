define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'makeNavActive',
    'text!templates/link1HTML.html'
    ], function($, _, Backbone, text, makeNavActive, link1HTML) {
      
        var link1View = Backbone.View.extend({
            el: $('#content'),
            render: function() {

                var compiledTemplate = _.template(link1HTML);
                
                this.$el.html(compiledTemplate);
                makeNavActive.init();
            }

        });

        return link1View;

});