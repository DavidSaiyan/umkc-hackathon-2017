// Set up packages and imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var clarifai   = require('./app/services/clarif');

//Configure App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 4215;
var router = express.Router();

router.route('/clarifai/predict').post(function(req, res){
        try {
            console.log('Requesting prediction for clarifai image');
            var image = req.body.url;

            console.log(image);

            clarifai.predict(image).then(function (resp){
                res.json(resp.outputs[0].data);
            }, function (err){
                res.json(err);
            });
        }catch (e){
            res.code = 500;
            res.json({msg: e});
        }
    });


router.route('/clarifai/predict/logo').post(function(req, res){
    try {
        console.log('Requesting prediction for clarifai image');
        var image = req.body.url;

        console.log(image);

        clarifai.predictLogo(image).then(function (resp){
            res.json(resp.outputs[0].data);
        }, function (err){
            res.json(err);
        });
    }catch (e){
        res.code = 500;
        res.json({msg: e});
    }
});

router.route('/clarifai/predictraw').post(function(req, res){
    try {
        console.log('Requesting prediction for clarifai image');
        var image = req.body.pic;
        clarifai.predictBase64(image).then(function (resp){
            res.json(resp.outputs[0].data);
        }, function (err){
            res.json(err);
        });
    }catch (e){
        res.code = 500;
        res.json({msg: e});
    }
});


//Register Routes
app.use('/api', router);

//Start Server
app.listen(port);
console.log('Application Port is:  ' + port);
