angular.module('App', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('login', {
    url: '/',
    templateUrl: 'login.html',
    controller: 'LoginCtrl'
  })
  $stateProvider.state('forgot-password', {
    url: '/forgot-password',
    templateUrl: 'forgot-password.html'
  })
  $stateProvider.state('app', {
    abstract: true,
    url: '/app',
    templateUrl: 'menu.html',
    controller: function($scope, $state, $http) {
      $http.post('/isAuth')
      .success(function(data, status, headers, config){
        if(!data.auth) $state.go('login');
      });

      $scope.goTo = function(name) {
        $state.go(name);
      };
    }
    //controller: 'WelcomeCtrl'
  })
  $stateProvider.state('app.welcome', {
    url: '/welcome',
    templateUrl: 'welcome.html',
    //controller: 'WelcomeCtrl'
  })

  $stateProvider.state('app.logic', {
    url: '/logic',
    templateUrl: 'logic.html',
    controller: 'LogicCtrl'
  })
})

.controller('LoginCtrl', function($scope, $rootScope, $state, $http, $ionicPopup) {
  $http.post('/isAuth')
  .success(function(data, status, headers, config){
    if(data.auth) $state.go('app.welcome');
  });

  $scope.signIn = function(user) {
    if(!user || !user.username || !user.password || user.username == "" || user.password == "") {
      $scope.openPopup('Preencha todos os dados', 'Campo vazio');
      return false;
    }

    $http.post('/login', user)
    .success(function(data, status, headers, config){
      if(data.auth) {
        $rootScope.username = data.user;
        $state.go('app.welcome');

      } else {
        $scope.openPopup(data.msg);

      }
    })
    .error(function(data, status, headers, config){
      $scope.openPopup(data.msg);
    });
  };

  $scope.openPopup = function(msg, title, btns) {
    var popup = $ionicPopup.confirm({
      title: title || 'Erro',
      buttons: btns || [
        { text: 'OK' }
        /*{
          text: 'Recuperar dados',
          type: 'button-royal',
          onTap: function() {
            $state.go('forgotpassword');
          }
        }*/],
      template: '<p style="text-align:center;">' + msg
    });
    popup.then(function(res) {
      return true;

    });
  };

})

.controller('LogicCtrl', function($scope, $rootScope, $state, $http, $ionicPopup) {
  $scope.canvas = this.__canvas = new fabric.Canvas('c', { selection: false });
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

  function makeCircle(left, top, line1, line2, line3, line4) {
    var rect = new fabric.Rect({

      width: 60,
      height: 40,
      strokeWidth: 5,
      fill: '#fff',
      stroke: '#666'
    });

    var text = new fabric.Text('hello world', {
      fontSize: 10,
      originX: 'center',
      originY: 'center'
    });

    var group = new fabric.Group([ rect, text ], {
      left: left,
      top: top,
    });

    group.hasControls = group.hasBorders = false;

    group.line1 = line1;
    group.line2 = line2;
    group.line3 = line3;
    group.line4 = line4;

    return group;
  }

  function makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
    });
  }

  var line = makeLine([ 250, 100, 250, 150 ]),
      line2 = makeLine([ 250, 150, 250, 225 ]),
      line3 = makeLine([ 250, 150, 175, 200 ]),
      line4 = makeLine([ 250, 150, 325, 200 ]);

  $scope.canvas.add(line, line2, line3, line4);

  $scope.canvas.add(
    makeCircle(line.get('x1'), line.get('y1'), null, line),
    makeCircle(line.get('x2'), line.get('y2'), line, line2, line3, line4),
    makeCircle(line2.get('x2'), line2.get('y2'), line2),
    makeCircle(line3.get('x2'), line3.get('y2'), line3),
    makeCircle(line4.get('x2'), line4.get('y2'), line4)
  );

  $scope.canvas.on('object:moving', function(e) {
    var p = e.target;
    p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    $scope.canvas.renderAll();
  });
})

.directive('custom', function(){
  return {
    link: function($scope, element, attrs) {
      element[0].placeholder = attrs.pholder;
      element.bind('focus', function(){
        element[0].placeholder = '';
      });
      element.bind('blur', function(){
        element[0].placeholder = attrs.pholder;
      });

    },
  };
})

.directive('draggable', function($document, $timeout) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0, width =0, elementW = 0, elementH = 0, parentHeight, parentWidth;
    parentHeight = element.parent().prop('clientHeight');
    parentWidth = element.parent().prop('clientWidth');
    $timeout(function() {
      elementW = element.prop('clientWidth');
      elementH = element.prop('clientHeight');
    },200);

    element.on('dragstart', function(event) {
      // Prevent default dragging of selected content
      event.gesture.preventDefault();
      startX = event.gesture.center.pageX - x;
      startY = event.gesture.center.pageY - y;
      $document.on('drag', move);
      $document.on('dragend', release);
    });

    function move(event) {
      y = event.gesture.center.pageY - startY;
      x = event.gesture.center.pageX - startX;
      if (x >= 0 && x <= (parentWidth-elementW)) {
        element.css({
          left:  x + 'px'
        });
      }
      if (y >= 0 && y <= parentHeight-elementH) {
        element.css({
          top:  y + 'px'
        });
      }
    }

    function release() {
      $document.unbind('drag', move);
      $document.unbind('dragend', release);
    }
  };
})

;
