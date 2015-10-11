(function() {

    var app = angular.module('grinz', []);

    app.controller('GrinzController', ['$http', function($http) {
        var self = this;

        $http.get('grinz-links.json').success(function(data) {
            self.navs = data;
        });

    }]);

    app.directive('grinzHeader', function() {
        return {
            restrict: 'E',
            templateUrl: './htmlSnippets/grinz-header.html'
        };
    });

    app.directive('grinzNav', function() {
        return {
            restrict: "E",
            templateUrl: './htmlSnippets/grinz-nav.html',
            link: function(scope, element, attrs) {
                element.ready(function() {
                    var linksArr = Array.prototype.slice.call(document.querySelectorAll('.nav__list-inner-link'));

                    linksArr.forEach(function(el) {
                        if (isEllipsisActive(el)) el.setAttribute('title', el.textContent);
                    });
                });
            }
        };
    });

    app.directive('grinzFooter', function() {
        return {
            restrict: "E",
            templateUrl: './htmlSnippets/grinz-footer.html'
        };
    });

    function isEllipsisActive(e) {
        return (e.offsetWidth < e.scrollWidth);
    }

})();