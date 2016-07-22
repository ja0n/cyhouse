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
      controller: 'DashboardCtrl' 
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
  var data = [
    {
        value: 64,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Utilizado"
    },
    {
        value: 36,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Livre"
    }
  ];
  var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps : 30,
    //String - Animation easing effect
    animationEasing : "easeOut",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  };
  var myDoughnutChart = new Chart(ctx).Doughnut(data,options);

  var canvas2 = document.querySelector('#consumption');
  var ctx = canvas2.getContext('2d');
  var data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Horas/Mês",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - If there is a stroke on each bar
    barShowStroke : true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  }

  var myBarChart = new Chart(ctx).Bar(data, options);

});

App.controller('RulesCtrl', function SettingsCtrl() {

});

App.controller('CreateRuleCtrl', function SettingsCtrl() {
  const canvas = new Sticky('sticky');
  
});
