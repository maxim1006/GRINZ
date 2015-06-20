(function() {



    window.App = {
        Views: {},
        Models: {},
        Collections : {},
        Router: {}
    };



    App.Router = Backbone.Router.extend({
        routes: {
            //индексная страница
            ''                 : 'index',
            //так будет роутер на страницы http://grinz.ru/require-backbone-underscore/router/index.html#page/5
            'page/:id'         : 'page',
            //роутер на страницу http://grinz.ru/require-backbone-underscore/router/index.html#page/5/300
            'page/:id/300'     : 'page300',
            //роутер на страницу http://grinz.ru/require-backbone-underscore/router/index.html#page/5/199
            'page/:id/*anyPage': 'anyPage',
            //пример для серча http://grinz.ru/require-backbone-underscore/router/index.html#search/5
            'search/:query'    : 'search',
            //дефолтный роут, нужно делать в конце
            '*other'           : 'default'
        },
        index: function() {
            console.log('index page');
        },
        page: function(id) {
            console.log('page id ' + id);
        },
        page300: function(id) {
            console.log('page300 id ' + id);
        },
        anyPage: function(id, anyPage) {
            console.log('id ' + id +' anyPage ' + anyPage);
        },
        search: function(query) {
            console.log('Поисковый запрос ' + query);
        },
        default: function(id) {
            console.log('Дефолтный запрос ' + id);
        }
    });

    new App.Router();

    Backbone.history.start();



})();