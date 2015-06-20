define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'makeNavActive',
    'text!templates/link2HTML.html'
    ], function($, _, Backbone, text, makeNavActive, link2HTML) {
      
        var link2View = Backbone.View.extend({
            el: $('#content'),
            render: function() {

                var compiledTemplate = _.template(link2HTML);
                
                this.$el.html(compiledTemplate);
                makeNavActive.init();
            }

        });

        return link2View;

});