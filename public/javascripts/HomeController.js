app.controller('HomeController', ['$scope', '$http', function($scope, $http){

    $scope.fabricStash = [];

    $scope.getSwatches = function(){
        $http({method: "GET", url:"/addSwatch/get"}).then(function(response){
            console.log(response);

            $scope.fabricStash = [];

            $scope.fabricStash.push(response.data);
        });
    };

    $scope.getSwatches();

}]);