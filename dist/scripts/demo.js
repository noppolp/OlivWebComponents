(function() {
  'use strict';
  angular.module('demo', ['olivWebComponent', 'demo.header', 'demo.nav', 'demo.content']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      });
    }
  ]).controller('AppCtrl', [
    '$scope', '$rootScope', '$route', '$document', function($scope, $rootScope, $route, $document) {
      var $window;
      $window = $(window);
      $scope.pageTransitionOpts = [
        {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: true,
        pageTransition: $scope.pageTransitionOpts[0],
        skin: '11'
      };
      $scope.color = {
        primary: '#5B90BF',
        success: '#A3BE8C',
        info: '#7FABD2',
        infoAlt: '#B48EAD',
        warning: '#EBCB8B',
        danger: '#BF616A',
        gray: '#DCDCDC'
      };
      return $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
        return $document.scrollTo(0, 0);
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  var HeaderSectionCtrl;

  HeaderSectionCtrl = [
    '$scope', '$location', function($scope, $location) {
      var vm;
      vm = this;
      $scope.signout = function() {
        return $location.path('/signin');
      };
    }
  ];

  angular.module('demo.header', []).directive('headerSection', [
    function() {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'scripts/demo/header/header.html',
        controller: HeaderSectionCtrl,
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  var NavBarCtrl;

  NavBarCtrl = function() {
    var vm;
    return vm = this;
  };

  angular.module('demo.nav', []).directive('navBar', [
    function() {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'scripts/demo/nav/nav.html',
        controller: NavBarCtrl,
        controllerAs: 'vm'
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('demo.content', []).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/dashboard', {
        templateUrl: 'scripts/demo/contents/dashboard.html'
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  var DirectiveCtrl;

  DirectiveCtrl = [
    '$scope', '$timeout', function($scope, $timeout) {
      var reload, vm;
      reload = function() {
        vm.loading = true;
        return $timeout(function() {
          return vm.loading = false;
        }, 1000);
      };
      vm = this;
      vm.reload = reload;
      vm.reload();
    }
  ];

  angular.module('demo.content').config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/directive', {
        templateUrl: 'scripts/demo/contents/directive.html',
        controller: DirectiveCtrl,
        controllerAs: 'vm'
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  var ServiceCtrl;

  ServiceCtrl = [
    '$scope', '$window', 'confirmModal', function($scope, $window, confirmModal) {
      var confirm, vm;
      confirm = function(title, body, result) {
        return confirmModal.open(title, body, result).then(function(_result) {
          return $window.alert(_result || 'confirmed');
        });
      };
      vm = this;
      vm.confirm = confirm;
    }
  ];

  angular.module('demo.content').config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/service', {
        templateUrl: 'scripts/demo/contents/service.html',
        controller: ServiceCtrl,
        controllerAs: 'vm'
      });
    }
  ]);

}).call(this);
