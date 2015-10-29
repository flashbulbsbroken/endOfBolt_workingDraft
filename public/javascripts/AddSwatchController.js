app.controller('AddSwatchController', ['$scope', '$http', '$location', 'Upload', function($scope, $http, $location, Upload){

    //$scope.fabricStash = [{}];

    $scope.swatchForm = {};

    $scope.addSwatch = function(event){


        $scope.upload($scope.file);

        $location.path('/home');
        //var swatchData = $scope.swatchForm;
        //
        //$http({method: "POST", url: "/add/add", enctype:"multipart/form-data", data: swatchData}).then(function(response){
        //    console.log(response);
        //
        //    $scope.getSwatches(swatchData);
        //});
    };

    $scope.upload = function (file) {
        var data = {file: file, swatchData: $scope.swatchForm};

        Upload.upload({
            url: '/add/add',
            data: data
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };

    //$scope.getSwatches = function(){
    //    $http({method: "GET", url:"/home/get"}).then(function(response){
    //
    //        $scope.swatchList = [];
    //
    //        for (var i = 0; i < response.fabricStash.length; i++){
    //            $scope.swatchList.push(response.data.fabricStash[i].img.path);
    //        }
    //
    //    });
    //};
    //
    //$scope.getSwatches();


}]);