app.controller("MapCtrl", ["$scope", "$stateParams", "Restangular", function($scope, $stateParams, Restangular){

  var errorMsg = "No Nearby Food Trucks Open Today";

  // var

  //requesting info from backend
  var getCarts = function(query){
    Restangular.one("food_trucks").get({'address': query}).then(function(success){
      $scope.map.markers = JSON.parse(success.markers);
      $scope.mapCenter.latitude = success.center.latitude;
      $scope.mapCenter.longitude = success.center.longitude;
      $scope.map.zoom = query ? 15 : 13;
      updateStatusText();

      console.log($scope.map.markers);
    }, function(error){
      console.log(error);
      $scope.status.text = "Oops! There was an error. Try Again?";
    });
  };

  var updateStatusText = function(){
    if ($scope.map.markers.length == 0){
      $scope.status.text = errorMsg;
    } else {
      var cartNum = $scope.map.markers.length;
      $scope.status.text = "Found Some Food Nearby";
    }
  };

  //initial page load
  // getCarts($stateParams.query);

  $scope.status = {text : "Loading..."};

  //required hardcoding for map to load unless Restangular in resolve
  $scope.mapCenter = {id: 0, latitude: 37.7833, longitude: -122.4167};

  $scope.map = {
    center: $scope.mapCenter,
    zoom: 13,
    markers: [$scope.mapCenter],
    markersEvents: {
      click: function(marker, eventName, model, arguments) {
        console.log(marker, eventName, model, arguments);
        $scope.map.window.model = model;
        $scope.map.window.show = true;
      }
    },
    window: {
      marker: {},
      show: false,
      closeClick: function() {
          this.show = false;
      },
      options: {}
    },
    options: {icon: 'http://www.nbkidsfest.com/images/foodtruckicon.png', scaledSize: '50%'}
  };

  $scope.newQuery = function(){
    $scope.status.text = "Loading...";
    getCarts($scope.query);
  };

}]);
