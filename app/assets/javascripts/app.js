var app = angular.module("app", ["ui.router", 'uiGmapgoogle-maps', 'restangular'])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.config(["RestangularProvider", function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api/v1");
  RestangularProvider.setRequestSuffix(".json");

}])


.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('base', {
        url: "/",
        template: '<base></base>'//,
        // controller: 'QueryCtrl'
      })
      .state('map', {
        url: "/map/:query",
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl',
        resolve: {
          mapData: ['Restangular', '$stateParams',
            function(Restangular, $stateParams){
              return Restangular.one("food_trucks").get(
                            {'address': $stateParams.query});
          }]
        }
      })
  }
])
