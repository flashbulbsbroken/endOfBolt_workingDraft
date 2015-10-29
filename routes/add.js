var express = require('express');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var Swatch = require('../models/swatch');
var User = require('../models/user');

var router = express.Router();

//Serves up page
router.get('/', function (request, response, next) {
    response.sendFile(path.join(__dirname, '../views/addSwatch.html'));
});


//Don't understand what this is doing? Why is it needed?
//router.get('/:filename', function (request, response, next) {
//    console.log(request.params.filename);
//    Swatch.findOne({
//        'file.filename': request.params.filename
//    }, function (err, upload) {
//
//        if (err) next(err);
//        else {
//            response.set({
//                "Content-Disposition": 'attachment; filename="' + upload.file.name + '"',
//                "Content-Type": upload.file.mimetype
//            });
//            fs.createReadStream(upload.file.path).pipe(response);
//        }
//    });
//});

router.post('/add', upload.single('file'), function(request, response, next) {
    console.log('Body', request.body);
    console.log('bodyswatchdata', request.body.swatchData);
    console.log('File', request.file);

    var createObj = request.body.swatchData;
    createObj.img = request.file;

    Swatch.model.create(createObj, function (err, swatch) {
        //console.log(swatch);
        //
        //console.log(request.user);

        if(err) throw err;

        User.findOne({_id:request.user._id}, function(err, user){

            console.log('this is the user', user);
            console.log('this is the swatch', swatch);

            if(!user.fabricStash){
                user.fabricStash = [];
            }

            user.fabricStash.push(swatch);

            user.save(function(err) {
                if(err) throw err;
            })

        });
        response.sendStatus(200);
    });
});

//router.put('/push', function (request, response, next) {
//
//    console.log(request.user);
//
//    User.findOne({_id: request.user._id}, function (err, user) {
//
//        if(err) throw err;
//
//        console.log('this is the user', user);
//        //console.log('this is the swatch', swatch);
//
//        //user.fabricStash.push(swatch);
//
//        user.save(function (err) {
//            if (err) throw err;
//        })
//
//    });
//
//    response.sendStatus(200);
//
//});
//

//router.get('/get', function (request, response, next) {
//
//    User.findOne({__id: request.user._id}, function (err, user) {
//        console.log(fabricStash);
//        response.json(fabricStash);
//
//        if (err) throw err;
//    });
//});




module.exports = router;

