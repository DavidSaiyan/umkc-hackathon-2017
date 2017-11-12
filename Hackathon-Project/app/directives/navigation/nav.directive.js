(function () {
    'use strict';

    angular
        .module('app')
        .directive('menuNav', navigation);

    navigation.$inject = ['$rootScope', '$window', 'baseUrl', 'AppName'];

    function navigation($rootScope, $window, baseUrl, appName) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/navigation/nav.directive.html',
            link: link
        };

        function link(scope){
            scope.appName = appName;

            scope.menu_options = [
                {Text: 'Chat', Url: '/chat'},
                {Text: 'Translate', Url: '/translate'},
                {Text: 'Learn', Urk: '/tips'}];

            scope.navigate = function(page){
                $window.location.href = baseUrl+page;
            }
        }
    }
})();