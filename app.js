const App = angular.module('App', ['ui.router', 'ngAnimate']);

App.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/dashboard');
  //
  // Now set up the states
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: function($scope) {
        $scope.items = ['A', 'List', 'Of', 'Items'];
      }
    });
});
