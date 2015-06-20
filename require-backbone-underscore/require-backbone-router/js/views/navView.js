define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'models/nav',
    'text!templates/navHTML.html'
    ], function($, _, Backbone, text, navs, navHTML) {

    
        var NavView = Backbone.View.extend({
            el: $('#menu'),
            render: function() {
                this.collection = navs;

                var data = {
                    navs: this.collection.models
                };

                var compiledTemplate = _.template(navHTML, data);
                
                this.$el.html(compiledTemplate);
            }
        });


        return NavView;

});