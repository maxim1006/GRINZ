define([
   'underscore',
   'backbone'
    ], function(_, Backbone) {

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

        var Lists = Backbone.Collection.extend({});
        var lists = new Lists([listCSS, listJS, listJQuery]);

        return lists;

});