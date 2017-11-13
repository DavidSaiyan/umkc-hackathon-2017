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
            scope.imageUrl = 'https://www.gannett-cdn.com/-mm-/56cefca4e7d49745c87e93f1df10ae25554a839c/r=540/https/videos.usatoday.net/Brightcove3/29906170001/201705/3451/29906170001_5450084220001_5450084779001-vs.jpg' //'http://cdn.cnn.com/cnnnext/dam/assets/171108130529-trump-11-07-2017-full-169.jpg';
            scope.loadFromUrl = function(url){
                scope.imageList.splice(0,0,{Image: url, Type: 'Url', Info: null});

                // $http.get(url).then(function(res){
                //     console.log(res);
                //     scope.imageList.splice(0,0,{Image: url, Type: 'Url', Info: null});
                // }, function (err){
                //     console.log(err);
                // })
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
                    scope.imageList.splice(0,0,{Image: e.target.result, Type: 'Base64', Info: null });
                    //console.log({Image: e.target.result, Type: 'Base64'});
                });
            }

        }
    }
})();