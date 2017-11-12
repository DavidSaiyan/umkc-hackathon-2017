(function () {
    'use strict';

    angular
        .module('app')
        .directive('analyzer', analyzer);

    analyzer.$inject = ['$rootScope', 'ClarifaiService'];

    function analyzer($rootScope, clarifai) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/images/analyzer.directive.html',
            link: link
        };

        function link(scope){
            scope.results = [];
            scope.image = null;
            scope.tags = [];
            scope.tags.push({Name: 'Nike Logo', Style: {"color":"white", "left":"100px", "top":"100px"}});
            scope.analyze = analyze;

            $rootScope.$on('NewImageSelected', function(evt, data){
                scope.image = data;
            });

            function analyze(){
                console.log(scope.image.Type);
                if(scope.image.Type === 'Url'){
                    clarifai.analyzeUrl(scope.image.Image).then(function (response){
                        scope.results = response;
                    }, function (err){
                        console.log(err);
                    })
                }else{
                    scope.results = clarifai.analyze(scope.image.Image);
                }
            }

            function findSimilar(){

            }

            function removeImage(){

            }
        }
    }
})();