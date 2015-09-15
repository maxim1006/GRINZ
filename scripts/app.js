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
            templateUrl: './htmlSnippets/grinz-nav.html'
        };
    });

    app.directive('grinzFooter', function() {
        return {
            restrict: "E",
            templateUrl: './htmlSnippets/grinz-footer.html'
        };
    });

})();