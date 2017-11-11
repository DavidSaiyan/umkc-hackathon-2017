(function () {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', '$logProvider',  '$locationProvider', 'socialProvider',
            function ($routeProvider, $logProvider, $locationProvider, socialProvider) {
                $logProvider.debugEnabled(true),
                    socialProvider.setGoogleKey('139914749858-ij8lcqu288a55cgah0gjdtsokbo8mqp0.apps.googleusercontent.com'),
                    socialProvider.setFbKey({appId: '266289193576013', apiVersion: 'v2.4'}),
                $routeProvider
                .when('/home', {
                    templateUrl: 'app/pages/home.controller.html',
                    controller: 'Home as vm'
                }).otherwise({
                    redirectTo: '/home'
                })
            }]);
})();