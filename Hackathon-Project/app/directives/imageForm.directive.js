(function () {
    'use strict';

    angular
        .module('app')
        .directive('imageForm', imageForm);

    imageForm.$inject = ['ClarifaiService'];

    function imageForm(clarifai) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/imageForm.directive.html',
            link: link
        };

        function link(scope){
            scope.youtubeLink = 'https://www.youtube.com/watch?v=';
            scope.imageFile = "";
            scope.chosenImage = 1;
            scope.tranlsatedKeyword = '';
            scope.inputText = "some text";

            scope.chooseImage = function(image){
                console.log(scope.inputText);
            }

            scope.imageList = [];

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
                    scope.imageList.push(e.target.result);
                });
            }

            scope.languageOptions = [
                {language: 'English',   value: 'en'},
                {language: 'Spanish',   value: 'es'},
                {language: 'French',    value: 'fr'},
                {language: 'German',    value: 'de'},
                {language: 'Hindu',     value: 'hi'}];

            scope.selectedLanguage = scope.languageOptions[0];

            scope.search = function(text){
                clarifai.analyze(text).then(function(response){
                    if(scope.selectedLanguage.value != 'en'){
                        angular.forEach(response, function(val){
                            //Translate youtube results to selected language
                        })
                        }
                    scope.searchResults = response;
                   // console.log(scope.searchResults);
                });
            }
        }
    }
})();