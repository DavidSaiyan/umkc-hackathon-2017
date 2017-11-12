(function () {
    'use strict';

    angular
        .module('app')
        .directive('images', images);

    images.$inject = ['$rootScope'];

    function images($rootScope) {
        return {
            restrict: 'E',
            scope: {
                image: '='
            },
            templateUrl: 'app/directives/images/image.directive.html',
            link: link
        };

        function link(scope){
            scope.tags = [];
            scope.isSelected = false;

            $rootScope.$on("NewImageSelect", function(evt, data){
                console.log("Different image selected");
                if(data.Image !== scope.image.Image){
                    scope.isSelected = false;
                }
            });

            scope.chooseImage = function(){
                scope.isSelected = !scope.isSelected;

                $rootScope.$broadcast("NewImageSelected",scope.image);
            };
        }
    }
})();