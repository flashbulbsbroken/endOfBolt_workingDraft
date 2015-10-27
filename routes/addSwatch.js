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
router.get('/:filename', function (request, response, next) {
    console.log(request.params.filename);
    Swatches.findOne({
        'file.filename': request.params.filename
    }, function (err, upload) {

        if (err) next(err);
        else {
            response.set({
                "Content-Disposition": 'attachment; filename="' + upload.file.name + '"',
                "Content-Type": upload.file.mimetype
            });
            fs.createReadStream(upload.file.path).pipe(response);
        }
    });
});

//Image uploading
router.post('/add', upload.single('image'), function (request, response) {
    console.log(request.file);
    console.log(request.body);

    var swatch = {
        //userID references the id of who is currently logged in
        userID: request.user._id,
        name: request.body.fabricName,
        collection: request.body.collectionz,
        designer: request.body.designer,
        manufacturer: request.body.manufacturer,
        amountYards: request.body.amountYd,
        amountInches: request.body.amountIn,
        width: request.body.width,
        colors: request.body.colors,
        img: request.file,
        dateAdded: Date.now()
    };

    Swatches.create(swatch, request.body, function (err, post) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {

                    //////////////////////////////////////
                    //LOOK INTO WHY I CAN'T ROUTE TO HOME
                    /////////////////////////////////////

                    response.redirect('/');
                }
            });

            //User.findOne({username: request.params.userID}, function(err, swatch){
            //    User.fabricStash.push(request.body.img);
            //    User.save(function(err){
            //        if(err) throw err;
            //    });
            //});

});

router.get('/get/:userID', function(request, response, next){
    var userID = request.params.user._id;

    if(userID){
        User.findOne({fabricStash:[]}, function(err, fabricStashes){
            response.json(fabricStashes);
        })
    }else{

    }
});

router.post('/pushSwatch', function(request, response){
    var userID = request.params.user._id;

    User.findOneAndUpdate(
        {_id:id},
        {$push:{fabricStash:Swatches}},
        {safe:true,upsert:true},

        function(err, toDo) {
            if (err) console.log(err);

            response.sendStatus(200);
        })
});

module.exports = router;

