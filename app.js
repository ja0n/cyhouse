const App = angular.module('App', ['ui.router', 'ngAnimate']);

App.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/dashboard');
  $urlRouterProvider.when('/modules', '/modules/list');
  $urlRouterProvider.when('/rules', '/rules/list');

  // Now set up the states
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .state('modules', {
      url: '/modules',
      templateUrl: 'partials/modules.html',
      controller: 'ModulesCtrl'
    })
    .state('modules.list', {
      url: '/list',
      templateUrl: 'partials/modules.list.html'
    })
    .state('modules.register', {
      url: '/register',
      templateUrl: 'partials/modules.register.html',
      controller: 'RegisterModuleCtrl'
    })
    .state('rules', {
      url: '/rules',
      templateUrl: 'partials/rules.html',
      controller: 'RulesCtrl'
    })
    .state('rules.list', {
      url: '/list',
      templateUrl: 'partials/rules.list.html'
    })
    .state('rules.create', {
      url: '/create',
      templateUrl: 'partials/rules.create.html',
      controller: 'CreateRuleCtrl'
    })
    ;
});


App.controller('DashboardCtrl', function DashboardCtrl() {
  var canvas1 = document.querySelector('#ram');
  var ctx = canvas1.getContext('2d');
  var data = {
    labels: [
      "Ativo",
      "Inativo",
    ],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: [
          "#05AB2E",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#05AB2E",
          "#FF6384",
        ]
      }
    ]
  };

  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
  });

  var canvas2 = document.querySelector('#consumption');
  var ctx = canvas2.getContext('2d');

  var data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Maior consumo",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        data: [81, 59, 65, 70, 56, 55, 40],
      }
    ]
  };

  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
  });

  var myBarChart = new Chart(ctx).Bar(data, options);

});

App.controller('ModulesCtrl', function SettingsCtrl() {

});

App.controller('RegisterModuleCtrl', function SettingsCtrl() {

});

App.controller('RulesCtrl', function SettingsCtrl() {

});

App.controller('CreateRuleCtrl', function SettingsCtrl() {
  const canvas = new Sticky('sticky');

  canvas.registerBlock('AnalogRead', {
    fill: '#4fec2f',
    ports: { data_in: 0, data_out: 1, flow_in: 0, flow_out: 0 },
    title: 'Analogic Read',
    gui: {
      port: { label: 'Port', type: 'select', options: ['A_01', 'A_02', 'A_03', 'A_04', 'A_05'] }
    },
    behavior: function() {
      return [this.inputs.port];
    }
  });

  canvas.registerBlock('DigitalWrite', {
    fill: '#EC962F',
    ports: { data_in: 1, data_out: 0, flow_in: 1, flow_out: 1 },
    title: 'Digital Write',
    gui: {
      port: { label: 'Port', type: 'select', options: ['D_01', 'D_02', 'D_03', 'D_04', 'D_05'] }
    },
    behavior: function(findById) {
      return 0;
    }
  });

  var rect1 = canvas.createBlock('Source');
  var rect2 = canvas.createBlock('AnalogRead');
  var rect3 = canvas.createBlock('DigitalWrite');
  var rect4 = canvas.createBlock('Comparison');
  rect1.x = 130; rect1.y = 230;
  rect2.x = 330; rect2.y = 200;
  rect3.x = 330; rect3.y = 100;
  rect4.x = 130; rect4.y = 300;
  canvas.addObj(rect1);
  canvas.addObj(rect2);
  canvas.addObj(rect3);
  canvas.addObj(rect4);
});
