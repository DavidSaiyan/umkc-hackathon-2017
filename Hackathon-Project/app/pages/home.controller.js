(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home', home);

    home.$inject = ['$scope'];

    function home($scope) {
        var vm  = this;
    }
})();