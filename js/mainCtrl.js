angular.module('weatherApp').controller('mainCtrl', function($scope, weatherService) {

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     $scope.pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     console.log($scope.pos)
  //   })
  // }
  $scope.test= "test"
weatherService.getCurrentLocation().then(function(result){
  $scope.pos = result
    console.log($scope.pos)
  $scope.$digest();

});










})
