define([
    'jquery',
    'underscore',
    'backbone',
    'text',
    'models/list',
    'text!templates/nav.html'
    ], function($, _, Backbone, text, lists, navHTML) {
        

        function listView() {

            var V = Backbone.View.extend({
                render: function() {
                    var data = {
                        navDropdownRightRows: this.model.get('navDropdownRightRows'),
                        navLink: this.model.get('navLink'),
                        arr: this.model.get('arr')
                    };

                    var temp = navHTML;
                    this.$el.html(
                        _.template(temp, data)
                    );
                    return this;
                },
                events: {
                    'click .nav__list-item-link':'returnFalse'
                },
                returnFalse: function() {
                    return false;
                }
            });

            _.each(lists.models, function(model, number) {
                $('.nav__list-item')
                    .eq(number)
                        .append(new V({model: model}).render().el);
            });

        }

        
        return {
            listView:listView
        };


});