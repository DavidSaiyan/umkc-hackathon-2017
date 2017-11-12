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
            scope.analyzeLogo = analyzeLogo;
            scope.errs = '';


            $rootScope.$on('NewImageSelected', function(evt, data){
                scope.image = data;
            });

            function analyze(){
                console.log(scope.image.Type);
                if(scope.image.Type === 'Url'){
                    clarifai.analyzeUrl(scope.image.Image).then(function (response){
                        scope.results = response;
                        scope.errs = '';
                    }, function (err){
                        console.log(err);
                        scope.errs = 'No similar items found.';
                    })
                }else{
                    //scope.results = clarifai.analyze(scope.image.Image);
                    console.log('Cannot analyze base64 images at this time.');
                    scope.rrs = 'Raw image data not currently supported.';
                }
            }

            function analyzeLogo(){
                console.log(scope.image.Type);
                if(scope.image.Type === 'Url'){
                    clarifai.analyzeLogo(scope.image.Image).then(function (response){
                        scope.results = response;
                        scope.errs = '';
                    }, function (err){
                        console.log(err);
                        scope.errs = 'No logos found in image.';
                    })
                }else{
                    console.log('Cannot analyze base64 images at this time.');
                    scope.rrs = 'Raw image data not currently supported.';
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

                            if(scope.results.Errors || scope.results.images[0].transaction.status === "failure"){
                                console.log('failure');
                                scope.errs = 'This is not Lebron James.';
                                console.log(scope.errs);
                            }else{
                                var name =  scope.results.images[0].transaction.subject_id;
                                var value =  scope.results.images[0].transaction.confidence;
                                scope.results = [{name: name, value: value}];
                                scope.errs = '';
                            }
                        }
                    };
                }
            }
        }
    }
})();