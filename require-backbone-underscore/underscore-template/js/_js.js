(function() {

        var List = Backbone.Model.extend({});

        var listCSS = new List({
                navLink: 'Ссылка 1',
                arr: [
                        '<a href="#">Подссылка 1.1</a>',
                        '<a href="#">Подссылка 1.2</a>',
                        '<a href="#">Подссылка 1.3</a>',
                        '<a href="#">Подссылка 1.4</a>',
                        '<a href="#">Подссылка 1.5</a>'
                    ]
            });

        var listJS = new List({
                navLink: 'Ссылка 2',
                arr: [
                        '<a href="#">Подссылка 2.1</a>',
                        '<a href="#">Подссылка 2.2</a>'
                    ]
            });
        
        var listJQuery = new List({
                navDropdownRightRows: 'nav__dropdown_right-rows',
                navLink: 'Сcылка 3',
                arr: [
                        [
                            '<a href="#">Подссылка 3.1</a>',
                            '<a href="#">Подссылка 3.2</a>',
                            '<a href="#">Подссылка 3.3</a>',
                            '<a href="#">Подссылка 3.4</a>',
                            '<a href="#">Подссылка 3.5</a>'
                        ],
                        [
                            '<a href="#">Подссылка 3.6</a>',
                            '<a href="#">Подссылка 3.7</a>',
                            '<a href="#">Подссылка 3.8</a>',
                            '<a href="#">Подссылка 3.9</a>',
                            '<a href="#">Подссылка 3.10</a>'
                        ],
                        [
                            '<a href="#">Подссылка 3.11</a>'
                        ]
                    ]
            });

        var V = Backbone.View.extend({
            render: function() {
                var data = {
                    navDropdownRightRows: this.model.get('navDropdownRightRows'),
                    navLink: this.model.get('navLink'),
                    arr: this.model.get('arr')
                };

                var temp = $('#template').html();
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

        var Lists = Backbone.Collection.extend({});
        var lists = new Lists([listCSS, listJS, listJQuery]);

        _.each(lists.models, function(model, number) {
            $('.nav__list-item')
                .eq(number)
                    .append(new V({model: model}).render().el);
        });

})();