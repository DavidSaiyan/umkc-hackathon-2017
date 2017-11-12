(function () {
    'use strict';

    angular
        .module('app')
        .directive('analyzer', analyzer);

    analyzer.$inject = ['$rootScope', 'ClarifaiService', 'KairosService'];

    function analyzer($rootScope, clarifai, kairos) {
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
            scope.analyzeKairos = analyzeKairos;

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

            function analyzeKairos(){
                console.log(scope.image.Type);
                if(scope.image.Type === 'Url'){
                    var req = kairos.analyze(scope.image.Image);

                    var body = {
                        'image': scope.image.Image,
                        'gallery_name': 'UMKCgallery'
                    };
                    req.send(JSON.stringify(body))

                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            scope.results = JSON.parse(this.responseText);
                            console.log(scope.results);
                        }
                    };
                }
            }
        }
    }
})();