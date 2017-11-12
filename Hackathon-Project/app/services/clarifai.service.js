(function () {
    'use strict';

    angular
        .module('app')
        .factory('ClarifaiService', clarifaiService);

    clarifaiService.$inject = ['$http', 'ClarifaiApiKey'];

    function clarifaiService($http, apiKey) {
        var factory = {
            analyze: analyze,
            analyzeUrl: analyzeUrl,
            analyzeLogo: analyzeLogo
        };
        return factory;

         function analyze(image) {
             var data = {pic: image};
             console.log('Attempting to predict image');
             return $http.post('http://localhost:4215/api/clarifai/predictraw', data).then(
                 function(response) {
                     console.log(response);
                     return response.data.concepts;
                 },
                 function(err) {
                     console.log(err);
                     return err;
                 }
             );
         }

        function analyzeUrl(imageUrl) {
            console.log('Attempting to predict image');
            return $http.post('http://localhost:4215/api/clarifai/predict/', {url: imageUrl}).then(
                function(response) {
                    console.log(response);
                    return response.data.concepts;
                },
                function(err) {
                    console.log(err);
                    return err;
                }
            );
        }

        function analyzeLogo(imageUrl) {
            console.log('Attempting to predict image');
            return $http.post('http://localhost:4215/api/clarifai/predict/logo', {url: imageUrl}).then(
                function(response) {
                    console.log(response);
                    return response.data.regions[0].data.concepts;
                },
                function(err) {
                    console.log(err);
                    return err;
                }
            );
        }
    }
})();