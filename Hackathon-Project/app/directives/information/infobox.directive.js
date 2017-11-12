(function () {
    'use strict';

    angular
        .module('app')
        .directive('infobox', infobox);

    infobox.$inject = [];

    function infobox() {
        return {
            restrict: 'E',
            scope: {
                results: '=',
                errors: '='
            },
                templateUrl: 'app/directives/information/infobox.directive.html',
                link: link
            };

        function link(scope) {
            // scope.$watch('errors', function() {
            //     alert('Error has occured!');
            // });
        }
    }
})();