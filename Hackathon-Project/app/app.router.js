(function () {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', '$logProvider',  '$locationProvider',
            function ($routeProvider, $logProvider, $locationProvider) {
                $logProvider.debugEnabled(true),
                $routeProvider
                .when('/home', {
                    templateUrl: 'app/controllers/home.controller.html',
                    controller: 'Home as vm'
                }).otherwise({
                    redirectTo: '/home'
                })
            }]);
})();