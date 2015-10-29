var express = require('express');
var path = require('path');

var User = require('../models/user');

var router = express.Router();



router.get('/get', function (request, response, next) {

    var userId = request.user._id;

    console.log('User ID is', userId);

    //var swatchItem = request.params.fabricStash.img.filename;


    User.findOne({_id : userId}, function(err, user){
        if(err) throw err;
        console.log('User\'s Fabric Stash', user.fabricStash);
        response.send(user.fabricStash);
        //response.sendStatus(200);
    });

    //if(swatchItem){
    //    Users.findOne({path:swatchItem}, function (err, paths) {
    //        response.json(paths);
    //    })
    //    }else {
    //        Users.find(function(err,item){
    //            response.json(item);
    //        })
    //    }
});

router.get('/', function(request, response, next) {
    console.log('hit home whack endpoint');
    response.sendFile(path.join(__dirname, '../views/home.html'));
});

module.exports = router;
