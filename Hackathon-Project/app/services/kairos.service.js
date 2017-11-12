(function () {
    'use strict';

    angular
        .module('app')
        .factory('KairosService', kairosService);

    kairosService.$inject = ['$http', 'KairosApiKey', 'KairosAppId'];

    function kairosService($http, apiKey, appId) {
        var factory = {
            analyze: analyze
        };
        return factory;

        var kairos_enroll_url = 'https://api.kairos.com/enroll';
        var kairos_predict_url = 'https://api.kairos.com/recognize';


        function analyze(image){
            var request = new XMLHttpRequest();
            request.open('POST', 'https://api.kairos.com/recognize');
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('app_id', 'afdbe386');
            request.setRequestHeader('app_key', 'be6b1bf2f9b963e98644c7172bd129d9');

            return request;
        }

         // function analyze2(image) {  //Couldn't get this to work for some dumb reason
         //     console.log('Attempting to predict image using Kairos');
         //
         //     var request = {
         //         method: 'POST',
         //         url: kairos_predict_url,
         //         Headers: { 'Content-Type': 'application/json', 'app_id': appId, 'app_key': apiKey },
         //         data: JSON.stringify({ 'image': image, 'gallery_name': 'UMKCgallery'})
         //     };
         //
         //     return $http(request).then(
         //         function(response) {
         //             console.log('request begins');
         //             console.log(response);
         //             return response;
         //         },
         //         function(err) {
         //             console.log('request err');
         //             console.log(err);
         //             return err;
         //         }
         //     );
         // }
    }
})();