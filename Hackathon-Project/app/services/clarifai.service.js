(function () {
    'use strict';

    angular
        .module('app')
        .factory('ClarifaiService', clarifaiService);

    clarifaiService.$inject = ['$http', 'ClarifaiApiKey'];

    function clarifaiService($http, apiKey) {
        var factory = {
            analyze: analyze
        };
        return factory;

         function analyze(text) {
             return $http.get('https://www.googleapis.com/youtube/v3/search', {
                 params: {
                     key: apiKey,
                     type: 'video',
                     maxResults: '10',
                     pageToken: '',
                     part: 'id,snippet',
                     fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken',
                     q: text
                 }
             }).then(function(response) {
                 if (response.data.items.length === 0) {
                     return 'The search did not return any results'
                 }else{
                     return response.data.items;
                 }
             }, function(error){
                 console.log(error);
                 return error.data.error.errors.message;
             });
         }
    }
})();