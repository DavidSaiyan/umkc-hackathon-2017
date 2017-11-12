(function () {
    'use strict';

    angular
        .module('app')
        .directive('imageForm', imageForm);

    imageForm.$inject = ['$http'];

    function imageForm($http) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/images/imageForm.directive.html',
            link: link
        };

        function link(scope){
            scope.imageFile = "";
            scope.chosenImage = 1;
            scope.imageList = [];
            scope.imageList2 = [];
            scope.imageUrl = 'http://cdn.cnn.com/cnnnext/dam/assets/171108130529-trump-11-07-2017-full-169.jpg';
            scope.loadFromUrl = function(url){
                $http.get(url).then(function(res){
                    console.log(res);
                    scope.imageList.splice(0,0,{Image: url, Type: 'Url'});
                }, function (err){
                    console.log(err);
                })
            };

            scope.imageUpload = function(event){
                var files = event.target.files; //FileList object

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var reader = new FileReader();
                    reader.onload = scope.imageIsLoaded;
                    reader.readAsDataURL(file);
                }
            }

            scope.imageIsLoaded = function(e){
                scope.$apply(function() {
                    scope.imageList.splice(0,0,{Image: e.target.result, Type: 'Base64'});
                    //console.log({Image: e.target.result, Type: 'Base64'});
                });
            }

        }
    }
})();