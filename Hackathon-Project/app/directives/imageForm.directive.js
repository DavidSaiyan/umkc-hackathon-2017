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

            scope.enroll = function() {

               /* var kairos_url = 'https://api.kairos.com/enroll';
                var params = {
                    'image': 'http://www.pngmart.com/files/2/LeBron-James-PNG-Photo.png',
                    'subject_id': 'Lebron James',
                    'gallery_name': 'UMKCgallery'
                };

                var xhr = new XMLHttpRequest();
                xhr.open('POST', kairos_url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('app_id','afdbe386');
                xhr.setRequestHeader('app_key','be6b1bf2f9b963e98644c7172bd129d9');

                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        console.log('Body:', this.responseText);
                    }
                };
                xhr.send(JSON.stringify(params));  */

                var request = new XMLHttpRequest();

                request.open('POST', 'https://api.kairos.com/recognize');

                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('app_id', 'afdbe386');
                request.setRequestHeader('app_key', 'be6b1bf2f9b963e98644c7172bd129d9');

                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
                        console.log('Body:', this.responseText);
                    }
                };

                var body = {
                    'image': 'http://static1.businessinsider.com/image/576855c552bcd020008ca5fa/lebron-james-finally-revealed-the-secret-motivation-that-he-said-was-fueling-him-to-win-a-championship-in-cleveland.jpg',
                    'gallery_name': 'UMKCgallery'
                };

                request.send(JSON.stringify(body));


            }
        }
    }
})();