var express = require('express');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var Swatches = require('../models/swatch');
var User = require('../models/user');

var router = express.Router();

//Serves up page
router.get('/', function (request, response, next) {
    response.sendFile(path.join(__dirname, '../views/addSwatch.html'));
});


//Don't understand what this is doing? Why is it needed?
//router.get('/:filename', function (request, response, next) {
//    console.log(request.params.filename);
//    Swatches.findOne({
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
    console.log('File', request.file);
    var createObj = request.body.swatchData;
    createObj.img = request.file;
    Swatches.create(createObj, function(err, post) {
        response.send('ok');
    });
    //response.send(200);
});


router.put('/pushSwatch', function (request, response) {
    console.log('reached add swatch/add endpoint');

    //var currentUser = request.body.data._id;

    console.log('This', request.body);

    User.findOneAndUpdate(
        {_id:request.body.userID},
        {$push:{fabricStash:request.body.data}},
        {safe:true,upsert:true},

        function(err, toDo) {
            if (err) console.log(err);

            response.sendStatus(200);
        });
    //var swatch = {
    //    //userID references the id of who is currently logged in
    //    userID: request.user._id,
    //    name: request.body.fabricName,
    //    collection: request.body.collectionz,
    //    designer: request.body.designer,
    //    manufacturer: request.body.manufacturer,
    //    amountYards: request.body.amountYd,
    //    amountInches: request.body.amountIn,
    //    width: request.body.width,
    //    colors: request.body.colors,
    //    img: request.file,
    //    dateAdded: Date.now()
    //};
    //
    //Swatches.create(swatch, request.body, function (err, post) {
    //    if (err) {
    //        console.log(err);
    //        next(err);
    //    } else {
    //
    //        //////////////////////////////////////
    //        //LOOK INTO WHY I CAN'T ROUTE TO HOME
    //        /////////////////////////////////////
    //
    //        response.redirect('/');
    //    }
    //});
});

//router.post('/pushSwatch', function(request, response){
//
//console.log('made it to pushSwatch');
//    console.log(request.body);
//
//});

router.get('/get/:userID?', function(request, response, next){
    var userID = request.user._id;

    if(userID){
        User.findOne({fabricStash:[]}, function(err, fabricStashes){
            response.json(fabricStashes);
        })
    }else{
        return err;
    }
});



module.exports = router;

