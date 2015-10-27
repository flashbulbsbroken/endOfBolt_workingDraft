app.controller('AddSwatchController', ['$scope', '$http', function($scope, $http){

    $scope.fabricStash = [];

    $scope.addSwatch = function(event){

        var sendSwatchData = new createSwatch(
            $scope.userID,
            $scope.fabricName,
            $scope.collectionz,
            $scope.designer,
            $scope.manufacturer,
            $scope.amountYards,
            $scope.amountInches,
            $scope.width,
            $scope.colors,
            $scope.img,
            $scope.dateAdded
        );

        $http({method: "POST", url: "/addSwatch/add", data: sendSwatchData}).then(function(response){
            console.log(response);

            $scope.getData();
        });
    };

    var createSwatch = function(imgParam){
        return {
            image: imgParam
        };
    };


    $scope.getSwatches = function(){
        $http({method: "GET", url:"/addSwatch/get"}).then(function(response){
            console.log(response);

            $scope.fabricStash = [];

            $scope.fabricStash.push(response.data);
        });
    };

    $scope.getSwatches();


}]);