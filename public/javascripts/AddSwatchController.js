app.controller('AddSwatchController', ['$scope', '$http', 'Upload', function($scope, $http, Upload){

    $scope.fabricStash = [];

    $scope.swatchForm = {};

    $scope.addSwatch = function(event){


        $scope.upload($scope.file);

        //var swatchData = $scope.swatchForm;
        //
        //$http({method: "POST", url: "/add/add", enctype:"multipart/form-data", data: swatchData}).then(function(response){
        //    console.log(response);
        //
        //    $scope.getSwatches(swatchData);
        //});
    };

    //var createSwatch = function(imgParam){
    //    return {
    //        image: imgParam
    //    };
    //};

    $scope.upload = function (file) {
        Upload.upload({
            url: '/add/add',
            data: {file: file, swatchData: $scope.swatchForm}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


    $scope.getSwatches = function(){
        $http({method: "GET", url:"/add/get"}).then(function(response){
            console.log(response);

            $scope.fabricStash = [];

            $scope.fabricStash.push(response.data);
        });
    };

    $scope.getSwatches();


}]);