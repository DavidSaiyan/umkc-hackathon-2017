(function () {
    'use strict';

    angular
        .module('app')
        .factory('KairosService', kairosService);

    kairosService.$inject = ['$http', 'KairosApiKey','KairosAppId'];

    function kairosService($http, apiKey, appId) {
        var factory = {
            gallery_enroll: gallery_enroll,
            gallery_recognize: gallery_recognize
        };
        return factory;

        function gallery_enroll() {

            var kairos_url = 'https://api.kairos.com/enroll';
            var params = {
                'image': 'http://www.pngmart.com/files/2/LeBron-James-PNG-Photo.png',
                'subject_id': 'Lebron James',
                'gallery_name': 'UMKCgallery'
            };

            var xhr = new XMLHttpRequest();
            xhr.open('POST', kairos_url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('app_id',appId);
            xhr.setRequestHeader('app_key',apiKey);

            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());
                    console.log('Body:', this.responseText);
                }
            };
            xhr.send(JSON.stringify(params));
        }

        function gallery_recognize() {

            var request = new XMLHttpRequest();

            request.open('POST', 'https://api.kairos.com/recognize');

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('app_id', appId);
            request.setRequestHeader('app_key', apiKey);

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
})();