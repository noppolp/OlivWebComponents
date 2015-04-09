(function() {
  'use strict';
  angular.module('slim.demo', ['slim', 'slim.controllers', 'slim.ui.ctrls', 'slim.ui.services', 'slim.ui.map.ctrls', 'slim.form.validation.ctrls', 'slim.ui.form.ctrls', 'slim.tables', 'slim.task.ctrls', 'slim.chart.ctrls', 'slim.page.ctrls']).config([
    '$routeProvider', function($routeProvider) {
      var routes, setRoutes;
      routes = ['dashboard', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps', 'tables/static', 'tables/dynamic', 'tables/responsive', 'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard', 'charts/charts', 'charts/flot', 'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/invoice', 'pages/signin', 'pages/signup', 'mail/compose', 'mail/inbox', 'mail/single', 'tasks/tasks'];
      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'scripts/slim/views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };
      routes.forEach(function(route) {
        return setRoutes(route);
      });
      return $routeProvider.when('/', {
        redirectTo: '/dashboard'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', '$route', '$document', function($scope, $rootScope, $route, $document) {
      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'Slim',
        name: 'Lisa Doe'
      };
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
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
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
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {}]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.ui.ctrls', []).controller('LoaderCtrl', [
    '$scope', 'cfpLoadingBar', function($scope, cfpLoadingBar) {
      $scope.start = function() {
        return cfpLoadingBar.start();
      };
      $scope.inc = function() {
        return cfpLoadingBar.inc();
      };
      $scope.set = function() {
        return cfpLoadingBar.set(0.3);
      };
      return $scope.complete = function() {
        return cfpLoadingBar.complete();
      };
    }
  ]).controller('NotifyCtrl', [
    '$scope', 'logger', function($scope, logger) {
      return $scope.notify = function(type) {
        switch (type) {
          case 'info':
            return logger.log("Heads up! This alert needs your attention, but it's not super important.");
          case 'success':
            return logger.logSuccess("Well done! You successfully read this important alert message.");
          case 'warning':
            return logger.logWarning("Warning! Best check yo self, you're not looking too good.");
          case 'error':
            return logger.logError("Oh snap! Change a few things up and try submitting again.");
        }
      };
    }
  ]).controller('AlertDemoCtrl', [
    '$scope', function($scope) {
      $scope.alerts = [
        {
          type: 'success',
          msg: 'Well done! You successfully read this important alert message.'
        }, {
          type: 'info',
          msg: 'Heads up! This alert needs your attention, but it is not super important.'
        }, {
          type: 'warning',
          msg: "Warning! Best check yo self, you're not looking too good."
        }, {
          type: 'danger',
          msg: 'Oh snap! Change a few things up and try submitting again.'
        }
      ];
      $scope.addAlert = function() {
        var num, type;
        num = Math.ceil(Math.random() * 4);
        type = void 0;
        switch (num) {
          case 0:
            type = 'info';
            break;
          case 1:
            type = 'success';
            break;
          case 2:
            type = 'info';
            break;
          case 3:
            type = 'warning';
            break;
          case 4:
            type = 'danger';
        }
        return $scope.alerts.push({
          type: type,
          msg: "Another alert!"
        });
      };
      return $scope.closeAlert = function(index) {
        return $scope.alerts.splice(index, 1);
      };
    }
  ]).controller('ProgressDemoCtrl', [
    '$scope', function($scope) {
      $scope.max = 200;
      $scope.random = function() {
        var type, value;
        value = Math.floor((Math.random() * 100) + 10);
        type = void 0;
        if (value < 25) {
          type = "success";
        } else if (value < 50) {
          type = "info";
        } else if (value < 75) {
          type = "warning";
        } else {
          type = "danger";
        }
        $scope.showWarning = type === "danger" || type === "warning";
        $scope.dynamic = value;
        $scope.type = type;
      };
      return $scope.random();
    }
  ]).controller('AccordionDemoCtrl', [
    '$scope', function($scope) {
      $scope.oneAtATime = true;
      $scope.groups = [
        {
          title: "Dynamic Group Header - 1",
          content: "Dynamic Group Body - 1"
        }, {
          title: "Dynamic Group Header - 2",
          content: "Dynamic Group Body - 2"
        }, {
          title: "Dynamic Group Header - 3",
          content: "Dynamic Group Body - 3"
        }
      ];
      $scope.items = ["Item 1", "Item 2", "Item 3"];
      $scope.status = {
        isFirstOpen: true,
        isFirstOpen1: true
      };
      $scope.addItem = function() {
        var newItemNo;
        newItemNo = $scope.items.length + 1;
        $scope.items.push("Item " + newItemNo);
      };
    }
  ]).controller('CollapseDemoCtrl', [
    '$scope', function($scope) {
      return $scope.isCollapsed = false;
    }
  ]).controller('ModalDemoCtrl', [
    '$scope', '$modal', '$log', function($scope, $modal, $log) {
      $scope.items = ["item1", "item2", "item3"];
      $scope.open = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: "myModalContent.html",
          controller: 'ModalInstanceCtrl',
          resolve: {
            items: function() {
              return $scope.items;
            }
          }
        });
        modalInstance.result.then((function(selectedItem) {
          $scope.selected = selectedItem;
        }), function() {
          $log.info("Modal dismissed at: " + new Date());
        });
      };
    }
  ]).controller('ModalInstanceCtrl', [
    '$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };
      $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
      };
      $scope.cancel = function() {
        $modalInstance.dismiss("cancel");
      };
    }
  ]).controller('PaginationDemoCtrl', [
    '$scope', function($scope) {
      $scope.totalItems = 64;
      $scope.currentPage = 4;
      $scope.setPage = function(pageNo) {
        return $scope.currentPage = pageNo;
      };
      $scope.maxSize = 5;
      $scope.bigTotalItems = 175;
      return $scope.bigCurrentPage = 1;
    }
  ]).controller('TabsDemoCtrl', [
    '$scope', function($scope) {
      $scope.tabs = [
        {
          title: "Dynamic Title 1",
          content: "Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."
        }, {
          title: "Disabled",
          content: "Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",
          disabled: true
        }
      ];
      return $scope.navType = "pills";
    }
  ]).controller('TreeDemoCtrl', [
    '$scope', function($scope) {
      $scope.list = [
        {
          id: 1,
          title: "Item 1",
          items: []
        }, {
          id: 2,
          title: "Item 2",
          items: [
            {
              id: 21,
              title: "Item 2.1",
              items: [
                {
                  id: 211,
                  title: "Item 2.1.1",
                  items: []
                }, {
                  id: 212,
                  title: "Item 2.1.2",
                  items: []
                }
              ]
            }, {
              id: 22,
              title: "Item 2.2",
              items: [
                {
                  id: 221,
                  title: "Item 2.2.1",
                  items: []
                }, {
                  id: 222,
                  title: "Item 2.2.2",
                  items: []
                }
              ]
            }
          ]
        }, {
          id: 3,
          title: "Item 3",
          items: []
        }, {
          id: 4,
          title: "Item 4",
          items: [
            {
              id: 41,
              title: "Item 4.1",
              items: []
            }
          ]
        }, {
          id: 5,
          title: "Item 5",
          items: []
        }, {
          id: 6,
          title: "Item 6",
          items: []
        }, {
          id: 7,
          title: "Item 7",
          items: []
        }
      ];
      $scope.selectedItem = {};
      $scope.options = {};
      $scope.remove = function(scope) {
        scope.remove();
      };
      $scope.toggle = function(scope) {
        scope.toggle();
      };
      return $scope.newSubItem = function(scope) {
        var nodeData;
        nodeData = scope.$modelValue;
        nodeData.items.push({
          id: nodeData.id * 10 + nodeData.items.length,
          title: nodeData.title + "." + (nodeData.items.length + 1),
          items: []
        });
      };
    }
  ]).controller('MapDemoCtrl', [
    '$scope', '$http', '$interval', function($scope, $http, $interval) {
      var i, markers;
      markers = [];
      i = 0;
      while (i < 8) {
        markers[i] = new google.maps.Marker({
          title: "Marker: " + i
        });
        i++;
      }
      $scope.GenerateMapMarkers = function() {
        var d, lat, lng, loc, numMarkers;
        d = new Date();
        $scope.date = d.toLocaleString();
        numMarkers = Math.floor(Math.random() * 4) + 4;
        i = 0;
        while (i < numMarkers) {
          lat = 43.6600000 + (Math.random() / 100);
          lng = -79.4103000 + (Math.random() / 100);
          loc = new google.maps.LatLng(lat, lng);
          markers[i].setPosition(loc);
          markers[i].setMap($scope.map);
          i++;
        }
      };
      $interval($scope.GenerateMapMarkers, 2000);
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.ui.map.ctrls', []).controller('jvectormapCtrl', [
    '$scope', function($scope) {
      var marker_data;
      marker_data = [
        {
          "latLng": [40.71, -74.00],
          "name": "New York"
        }, {
          "latLng": [39.90, 116.40],
          "name": "Beijing"
        }, {
          "latLng": [31.23, 121.47],
          "name": "Shanghai"
        }, {
          "latLng": [-33.86, 151.20],
          "name": "Sydney"
        }, {
          "latLng": [-37.81, 144.96],
          "name": "Melboune"
        }, {
          "latLng": [37.33, -121.89],
          "name": "San Jose"
        }, {
          "latLng": [1.3, 103.8],
          "name": "Singapore"
        }, {
          "latLng": [47.60, -122.33],
          "name": "Seattle"
        }, {
          "latLng": [41.87, -87.62],
          "name": "Chicago"
        }, {
          "latLng": [37.77, -122.41],
          "name": "San Francisco"
        }, {
          "latLng": [32.71, -117.16],
          "name": "San Diego"
        }, {
          "latLng": [51.50, -0.12],
          "name": "London"
        }, {
          "latLng": [48.85, 2.35],
          "name": "Paris"
        }, {
          "latLng": [52.52, 13.40],
          "name": "Berlin"
        }, {
          "latLng": [-26.20, 28.04],
          "name": "Johannesburg"
        }, {
          "latLng": [35.68, 139.69],
          "name": "Tokyo"
        }, {
          "latLng": [13.72, 100.52],
          "name": "Bangkok"
        }, {
          "latLng": [37.56, 126.97],
          "name": "Seoul"
        }, {
          "latLng": [41.87, 12.48],
          "name": "Roma"
        }, {
          "latLng": [45.42, -75.69],
          "name": "Ottawa"
        }, {
          "latLng": [55.75, 37.61],
          "name": "Moscow"
        }, {
          "latLng": [-22.90, -43.19],
          "name": "Rio de Janeiro"
        }
      ];
      return $scope.worldMap = {
        map: 'world_mill_en',
        markers: marker_data,
        normalizeFunction: 'polynomial',
        backgroundColor: null,
        zoomOnScroll: false,
        regionStyle: {
          initial: {
            fill: '#EEEFF3'
          },
          hover: {
            fill: $scope.color.primary
          }
        },
        markerStyle: {
          initial: {
            fill: '#BF616A',
            stroke: 'rgba(191,97,106,.8)',
            "fill-opacity": 1,
            "stroke-width": 9,
            "stroke-opacity": 0.5
          },
          hover: {
            stroke: 'black',
            "stroke-width": 2
          }
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.ui.form.ctrls', []).controller('TagsDemoCtrl', [
    '$scope', function($scope) {
      return $scope.tags = ['foo', 'bar'];
    }
  ]).controller('DatepickerDemoCtrl', [
    '$scope', function($scope) {
      $scope.today = function() {
        return $scope.dt = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        return $scope.dt = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return $scope.opened = true;
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      return $scope.format = $scope.formats[0];
    }
  ]).controller('TimepickerDemoCtrl', [
    '$scope', function($scope) {
      $scope.mytime = new Date();
      $scope.hstep = 1;
      $scope.mstep = 15;
      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        return $scope.ismeridian = !$scope.ismeridian;
      };
      $scope.update = function() {
        var d;
        d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        return $scope.mytime = d;
      };
      $scope.changed = function() {
        return console.log('Time changed to: ' + $scope.mytime);
      };
      return $scope.clear = function() {
        return $scope.mytime = null;
      };
    }
  ]).controller('TypeaheadCtrl', [
    '$scope', function($scope) {
      $scope.selected = void 0;
      return $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }
  ]).controller('RatingDemoCtrl', [
    '$scope', function($scope) {
      $scope.rate = 7;
      $scope.max = 10;
      $scope.isReadonly = false;
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        return $scope.percent = 100 * (value / $scope.max);
      };
      return $scope.ratingStates = [
        {
          stateOn: 'glyphicon-ok-sign',
          stateOff: 'glyphicon-ok-circle'
        }, {
          stateOn: 'glyphicon-star',
          stateOff: 'glyphicon-star-empty'
        }, {
          stateOn: 'glyphicon-heart',
          stateOff: 'glyphicon-ban-circle'
        }, {
          stateOn: 'glyphicon-heart'
        }, {
          stateOff: 'glyphicon-off'
        }
      ];
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.form.validation.ctrls', []).controller('wizardFormCtrl', [
    '$scope', function($scope) {
      $scope.wizard = {
        firstName: 'some name',
        lastName: '',
        email: '',
        password: '',
        age: '',
        address: ''
      };
      $scope.isValidateStep1 = function() {
        console.log($scope.wizard_step1);
        console.log($scope.wizard.firstName !== '');
        console.log($scope.wizard.lastName === '');
        return console.log($scope.wizard.firstName !== '' && $scope.wizard.lastName !== '');
      };
      return $scope.finishedWizard = function() {
        return console.log('yoo');
      };
    }
  ]).controller('formConstraintsCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.form = {
        required: '',
        minlength: '',
        maxlength: '',
        length_rage: '',
        type_something: '',
        confirm_type: '',
        foo: '',
        email: '',
        url: '',
        num: '',
        minVal: '',
        maxVal: '',
        valRange: '',
        pattern: ''
      };
      original = angular.copy($scope.form);
      $scope.revert = function() {
        $scope.form = angular.copy(original);
        return $scope.form_constraints.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.form, original) || !$scope.form_constraints.$pristine;
      };
      return $scope.canSubmit = function() {
        return $scope.form_constraints.$valid && !angular.equals($scope.form, original);
      };
    }
  ]).controller('signinCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        email: '',
        password: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        return $scope.form_signin.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signin.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]).controller('signupCtrl', [
    '$scope', function($scope) {
      var original;
      $scope.user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: ''
      };
      $scope.showInfoOnSubmit = false;
      original = angular.copy($scope.user);
      $scope.revert = function() {
        $scope.user = angular.copy(original);
        $scope.form_signup.$setPristine();
        return $scope.form_signup.confirmPassword.$setPristine();
      };
      $scope.canRevert = function() {
        return !angular.equals($scope.user, original) || !$scope.form_signup.$pristine;
      };
      $scope.canSubmit = function() {
        return $scope.form_signup.$valid && !angular.equals($scope.user, original);
      };
      return $scope.submitForm = function() {
        $scope.showInfoOnSubmit = true;
        return $scope.revert();
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.tables', []).controller('tableCtrl', [
    '$scope', '$filter', function($scope, $filter) {
      var init;
      $scope.stores = [
        {
          name: 'Nijiya Market',
          price: '$$',
          sales: 292,
          rating: 4.0
        }, {
          name: 'Eat On Monday Truck',
          price: '$',
          sales: 119,
          rating: 4.3
        }, {
          name: 'Tea Era',
          price: '$',
          sales: 874,
          rating: 4.0
        }, {
          name: 'Rogers Deli',
          price: '$',
          sales: 347,
          rating: 4.2
        }, {
          name: 'MoBowl',
          price: '$$$',
          sales: 24,
          rating: 4.6
        }, {
          name: 'The Milk Pail Market',
          price: '$',
          sales: 543,
          rating: 4.5
        }, {
          name: 'Nob Hill Foods',
          price: '$$',
          sales: 874,
          rating: 4.0
        }, {
          name: 'Scratch',
          price: '$$$',
          sales: 643,
          rating: 3.6
        }, {
          name: 'Gochi Japanese Fusion Tapas',
          price: '$$$',
          sales: 56,
          rating: 4.1
        }, {
          name: 'Cost Plus World Market',
          price: '$$',
          sales: 79,
          rating: 4.0
        }, {
          name: 'Bumble Bee Health Foods',
          price: '$$',
          sales: 43,
          rating: 4.3
        }, {
          name: 'Costco',
          price: '$$',
          sales: 219,
          rating: 3.6
        }, {
          name: 'Red Rock Coffee Co',
          price: '$',
          sales: 765,
          rating: 4.1
        }, {
          name: '99 Ranch Market',
          price: '$',
          sales: 181,
          rating: 3.4
        }, {
          name: 'Mi Pueblo Food Center',
          price: '$',
          sales: 78,
          rating: 4.0
        }, {
          name: 'Cucina Venti',
          price: '$$',
          sales: 163,
          rating: 3.3
        }, {
          name: 'Sufi Coffee Shop',
          price: '$',
          sales: 113,
          rating: 3.3
        }, {
          name: 'Dana Street Roasting',
          price: '$',
          sales: 316,
          rating: 4.1
        }, {
          name: 'Pearl Cafe',
          price: '$',
          sales: 173,
          rating: 3.4
        }, {
          name: 'Posh Bagel',
          price: '$',
          sales: 140,
          rating: 4.0
        }, {
          name: 'Artisan Wine Depot',
          price: '$$',
          sales: 26,
          rating: 4.1
        }, {
          name: 'Hong Kong Chinese Bakery',
          price: '$',
          sales: 182,
          rating: 3.4
        }, {
          name: 'Starbucks',
          price: '$$',
          sales: 97,
          rating: 3.7
        }, {
          name: 'Tapioca Express',
          price: '$',
          sales: 301,
          rating: 3.0
        }, {
          name: 'House of Bagels',
          price: '$',
          sales: 82,
          rating: 4.4
        }
      ];
      $scope.searchKeywords = '';
      $scope.filteredStores = [];
      $scope.row = '';
      $scope.select = function(page) {
        var end, start;
        start = (page - 1) * $scope.numPerPage;
        end = start + $scope.numPerPage;
        return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
      };
      $scope.onFilterChange = function() {
        $scope.select(1);
        $scope.currentPage = 1;
        return $scope.row = '';
      };
      $scope.onNumPerPageChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.onOrderChange = function() {
        $scope.select(1);
        return $scope.currentPage = 1;
      };
      $scope.search = function() {
        $scope.filteredStores = $filter('filter')($scope.stores, $scope.searchKeywords);
        return $scope.onFilterChange();
      };
      $scope.order = function(rowName) {
        if ($scope.row === rowName) {
          return;
        }
        $scope.row = rowName;
        $scope.filteredStores = $filter('orderBy')($scope.stores, rowName);
        return $scope.onOrderChange();
      };
      $scope.numPerPageOpt = [3, 5, 10, 20];
      $scope.numPerPage = $scope.numPerPageOpt[2];
      $scope.currentPage = 1;
      $scope.currentPageStores = [];
      init = function() {
        $scope.search();
        return $scope.select($scope.currentPage);
      };
      return init();
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.task.ctrls', []).factory('taskStorage', function() {
    var DEMO_TASKS, STORAGE_ID;
    STORAGE_ID = 'tasks';
    DEMO_TASKS = '[ {"title": "Upgrade to Yosemite", "completed": false}, {"title": "Finish homework", "completed": true}, {"title": "Try Google glass", "completed": false}, {"title": "Build a snowman :)", "completed": false}, {"title": "Play games with friends", "completed": true}, {"title": "Learn Swift", "completed": false}, {"title": "Shopping", "completed": true} ]';
    return {
      get: function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS);
      },
      put: function(tasks) {
        return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
      }
    };
  }).controller('taskCtrl', [
    '$scope', 'taskStorage', 'filterFilter', '$rootScope', 'logger', function($scope, taskStorage, filterFilter, $rootScope, logger) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.newTask = '';
      $scope.remainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      $scope.editedTask = null;
      $scope.statusFilter = {
        completed: false
      };
      $scope.filter = function(filter) {
        switch (filter) {
          case 'all':
            return $scope.statusFilter = '';
          case 'active':
            return $scope.statusFilter = {
              completed: false
            };
          case 'completed':
            return $scope.statusFilter = {
              completed: true
            };
        }
      };
      $scope.add = function() {
        var newTask;
        newTask = $scope.newTask.trim();
        if (newTask.length === 0) {
          return;
        }
        tasks.push({
          title: newTask,
          completed: false
        });
        logger.logSuccess('New task: "' + newTask + '" added');
        taskStorage.put(tasks);
        $scope.newTask = '';
        return $scope.remainingCount++;
      };
      $scope.edit = function(task) {
        return $scope.editedTask = task;
      };
      $scope.doneEditing = function(task) {
        $scope.editedTask = null;
        task.title = task.title.trim();
        if (!task.title) {
          $scope.remove(task);
        } else {
          logger.log('Task updated');
        }
        return taskStorage.put(tasks);
      };
      $scope.remove = function(task) {
        var index;
        $scope.remainingCount -= task.completed ? 0 : 1;
        index = $scope.tasks.indexOf(task);
        $scope.tasks.splice(index, 1);
        taskStorage.put(tasks);
        return logger.logError('Task removed');
      };
      $scope.completed = function(task) {
        $scope.remainingCount += task.completed ? -1 : 1;
        taskStorage.put(tasks);
        if (task.completed) {
          if ($scope.remainingCount > 0) {
            if ($scope.remainingCount === 1) {
              return logger.log('Almost there! Only ' + $scope.remainingCount + ' task left');
            } else {
              return logger.log('Good job! Only ' + $scope.remainingCount + ' tasks left');
            }
          } else {
            return logger.logSuccess('Congrats! All done :)');
          }
        }
      };
      $scope.clearCompleted = function() {
        $scope.tasks = tasks = tasks.filter(function(val) {
          return !val.completed;
        });
        return taskStorage.put(tasks);
      };
      $scope.markAll = function(completed) {
        tasks.forEach(function(task) {
          return task.completed = completed;
        });
        $scope.remainingCount = completed ? 0 : tasks.length;
        taskStorage.put(tasks);
        if (completed) {
          return logger.logSuccess('Congrats! All done :)');
        }
      };
      $scope.$watch('remainingCount == 0', function(val) {
        return $scope.allChecked = val;
      });
      return $scope.$watch('remainingCount', function(newVal, oldVal) {
        return $rootScope.$broadcast('taskRemaining:changed', newVal);
      });
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.chart.ctrls', []).controller('chartCtrl', [
    '$scope', function($scope) {
      $scope.easypiechartsm1 = {
        percent: 63,
        options: {
          animate: {
            duration: 1000,
            enabled: false
          },
          barColor: $scope.color.success,
          lineCap: 'round',
          size: 120,
          lineWidth: 5
        }
      };
      $scope.easypiechartsm2 = {
        percent: 35,
        options: {
          animate: {
            duration: 1000,
            enabled: false
          },
          barColor: $scope.color.info,
          lineCap: 'round',
          size: 120,
          lineWidth: 5
        }
      };
      $scope.easypiechartsm3 = {
        percent: 75,
        options: {
          animate: {
            duration: 1000,
            enabled: false
          },
          barColor: $scope.color.warning,
          lineCap: 'round',
          size: 120,
          lineWidth: 5
        }
      };
      $scope.easypiechartsm4 = {
        percent: 66,
        options: {
          animate: {
            duration: 1000,
            enabled: false
          },
          barColor: $scope.color.danger,
          lineCap: 'round',
          size: 120,
          lineWidth: 5
        }
      };
      $scope.easypiechart = {
        percent: 65,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: $scope.color.primary,
          lineCap: 'round',
          size: 180,
          lineWidth: 5
        }
      };
      $scope.easypiechart2 = {
        percent: 35,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: $scope.color.success,
          lineCap: 'round',
          size: 180,
          lineWidth: 10
        }
      };
      return $scope.easypiechart3 = {
        percent: 68,
        options: {
          animate: {
            duration: 1000,
            enabled: true
          },
          barColor: $scope.color.info,
          lineCap: 'square',
          size: 180,
          lineWidth: 20,
          scaleLength: 0
        }
      };
    }
  ]).controller('flotChartCtrl', [
    '$scope', function($scope) {
      var areaChart, barChart, barChartH, lineChart1, sampledata1, sampledata2;
      lineChart1 = {};
      lineChart1.data1 = [[1, 15], [2, 20], [3, 14], [4, 10], [5, 10], [6, 20], [7, 28], [8, 26], [9, 22]];
      $scope.line1 = {};
      $scope.line1.data = [
        {
          data: lineChart1.data1,
          label: 'Trend'
        }
      ];
      $scope.line1.options = {
        series: {
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0
                }, {
                  opacity: 0.3
                }
              ]
            }
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          }
        },
        colors: [$scope.color.primary, $scope.color.infoAlt],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        xaxis: {
          ticks: [[1, 'Jan.'], [2, 'Feb.'], [3, 'Mar.'], [4, 'Apr.'], [5, 'May'], [6, 'June'], [7, 'July'], [8, 'Aug.'], [9, 'Sept.'], [10, 'Oct.'], [11, 'Nov.'], [12, 'Dec.']]
        }
      };
      areaChart = {};
      areaChart.data1 = [[2007, 15], [2008, 20], [2009, 10], [2010, 5], [2011, 5], [2012, 20], [2013, 28]];
      areaChart.data2 = [[2007, 15], [2008, 16], [2009, 22], [2010, 14], [2011, 12], [2012, 19], [2013, 22]];
      $scope.area = {};
      $scope.area.data = [
        {
          data: areaChart.data1,
          label: "Value A",
          lines: {
            fill: true
          }
        }, {
          data: areaChart.data2,
          label: "Value B",
          points: {
            show: true
          },
          yaxis: 2
        }
      ];
      $scope.area.options = {
        series: {
          lines: {
            show: true,
            fill: false
          },
          points: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 5
          },
          shadowSize: 0
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        colors: [$scope.color.success, $scope.color.danger],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        xaxis: {
          mode: "time"
        },
        yaxes: [
          {}, {
            position: "right"
          }
        ]
      };
      sampledata1 = [[1, 65], [2, 59], [3, 90], [4, 81], [5, 56], [6, 55], [7, 68], [8, 45], [9, 66]];
      sampledata2 = [[1, 28], [2, 48], [3, 30], [4, 60], [5, 100], [6, 50], [7, 10], [8, 25], [9, 50]];
      $scope.area1 = {};
      $scope.area1.data = [
        {
          label: " A",
          data: sampledata1,
          bars: {
            order: 0,
            fillColor: {
              colors: [
                {
                  opacity: 0.3
                }, {
                  opacity: 0.3
                }
              ]
            },
            show: true,
            fill: 1,
            barWidth: 0.3,
            align: "center",
            horizontal: false
          }
        }, {
          data: sampledata2,
          curvedLines: {
            apply: true
          },
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0.2
                }, {
                  opacity: 0.2
                }
              ]
            }
          }
        }, {
          data: sampledata2,
          label: "D",
          points: {
            show: true
          }
        }
      ];
      $scope.area1.options = {
        series: {
          curvedLines: {
            active: true
          },
          points: {
            lineWidth: 2,
            fill: true,
            fillColor: "#ffffff",
            symbol: "circle",
            radius: 4
          }
        },
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: "#f9f9f9",
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: [$scope.color.gray, $scope.color.primary, $scope.color.primary]
      };
      barChart = {};
      barChart.data1 = [[2008, 20], [2009, 10], [2010, 5], [2011, 5], [2012, 20], [2013, 28]];
      barChart.data2 = [[2008, 16], [2009, 22], [2010, 14], [2011, 12], [2012, 19], [2013, 22]];
      barChart.data3 = [[2008, 12], [2009, 30], [2010, 20], [2011, 19], [2012, 13], [2013, 20]];
      $scope.barChart = {};
      $scope.barChart.data = [
        {
          label: "Value A",
          data: barChart.data1
        }, {
          label: "Value B",
          data: barChart.data2
        }, {
          label: "Value C",
          data: barChart.data3
        }
      ];
      $scope.barChart.options = {
        series: {
          stack: true,
          bars: {
            show: true,
            fill: 1,
            barWidth: 0.3,
            align: "center",
            horizontal: false,
            order: 1
          }
        },
        grid: {
          hoverable: true,
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: [$scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger]
      };
      $scope.barChart1 = {};
      $scope.barChart1.data = [
        {
          label: "Value A",
          data: barChart.data1,
          bars: {
            order: 0
          }
        }, {
          label: "Value B",
          data: barChart.data2,
          bars: {
            order: 1
          }
        }, {
          label: "Value C",
          data: barChart.data3,
          bars: {
            order: 2
          }
        }
      ];
      $scope.barChart1.options = {
        series: {
          stack: true,
          bars: {
            show: true,
            fill: 1,
            barWidth: 0.2,
            align: "center",
            horizontal: false
          }
        },
        grid: {
          hoverable: true,
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: [$scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger]
      };
      $scope.barChart3 = {};
      $scope.barChart3.data = [
        {
          label: " A",
          data: [[40, 1], [59, 2], [90, 3], [81, 4], [56, 5]],
          bars: {
            order: 0,
            fillColor: {
              colors: [
                {
                  opacity: 0.3
                }, {
                  opacity: 0.3
                }
              ]
            }
          }
        }, {
          label: " B",
          data: [[28, 1], [48, 2], [40, 3], [19, 4], [45, 5]],
          bars: {
            order: 1,
            fillColor: {
              colors: [
                {
                  opacity: 0.3
                }, {
                  opacity: 0.3
                }
              ]
            }
          }
        }
      ];
      $scope.barChart3.options = {
        series: {
          stack: true,
          bars: {
            show: true,
            fill: 1,
            barWidth: .35,
            align: "center",
            horizontal: true
          }
        },
        grid: {
          show: true,
          aboveData: false,
          color: '#eaeaea',
          hoverable: true,
          borderWidth: 1,
          borderColor: "#eaeaea"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: [$scope.color.gray, $scope.color.primary, $scope.color.info, $scope.color.danger]
      };
      barChartH = {};
      barChartH.data1 = [[85, 10], [50, 20], [55, 30]];
      barChartH.data2 = [[77, 10], [60, 20], [70, 30]];
      barChartH.data3 = [[100, 10], [70, 20], [55, 30]];
      $scope.barChart2 = {};
      $scope.barChart2.data = [
        {
          label: "Value A",
          data: barChartH.data1,
          bars: {
            order: 1
          }
        }, {
          label: "Value B",
          data: barChartH.data2,
          bars: {
            order: 2
          }
        }, {
          label: "Value C",
          data: barChartH.data3,
          bars: {
            order: 3
          }
        }
      ];
      $scope.barChart2.options = {
        series: {
          stack: true,
          bars: {
            show: true,
            fill: 1,
            barWidth: 1,
            align: "center",
            horizontal: true
          }
        },
        grid: {
          hoverable: true,
          borderWidth: 1,
          borderColor: "#eeeeee"
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        colors: [$scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger]
      };
      $scope.pieChart = {};
      $scope.pieChart.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }
      ];
      $scope.pieChart.options = {
        series: {
          pie: {
            show: true
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: [$scope.color.primary, $scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
      $scope.donutChart = {};
      $scope.donutChart.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }
      ];
      $scope.donutChart.options = {
        series: {
          pie: {
            show: true,
            innerRadius: 0.5
          }
        },
        legend: {
          show: true
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: [$scope.color.primary, $scope.color.success, $scope.color.info, $scope.color.warning, $scope.color.danger],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
      $scope.donutChart2 = {};
      $scope.donutChart2.data = [
        {
          label: "Download Sales",
          data: 12
        }, {
          label: "In-Store Sales",
          data: 30
        }, {
          label: "Mail-Order Sales",
          data: 20
        }, {
          label: "Online Sales",
          data: 19
        }, {
          label: "Direct Sales",
          data: 15
        }
      ];
      return $scope.donutChart2.options = {
        series: {
          pie: {
            show: true,
            innerRadius: 0.45
          }
        },
        legend: {
          show: false
        },
        grid: {
          hoverable: true,
          clickable: true
        },
        colors: ["#1BB7A0", "#39B5B9", "#52A3BB", "#619CC4", "#6D90C5"],
        tooltip: true,
        tooltipOpts: {
          content: "%p.0%, %s",
          defaultTheme: false
        }
      };
    }
  ]).controller('sparklineCtrl', [
    '$scope', function($scope) {
      $scope.demoData1 = {
        data: [3, 1, 2, 2, 4, 6, 4, 5, 2, 4, 5, 3, 4, 6, 4, 7],
        options: {
          type: 'line',
          lineColor: '#fff',
          highlightLineColor: '#fff',
          fillColor: $scope.color.success,
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          width: '100%',
          height: '150px'
        }
      };
      $scope.simpleChart1 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'line',
          lineColor: $scope.color.primary,
          fillColor: '#fafafa',
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false
        }
      };
      $scope.simpleChart2 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'bar',
          barColor: $scope.color.primary
        }
      };
      $scope.simpleChart3 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'pie',
          sliceColors: [$scope.color.primary, $scope.color.success, $scope.color.info, $scope.color.infoAlt, $scope.color.warning, $scope.color.danger]
        }
      };
      $scope.tristateChart1 = {
        data: [1, 2, -3, -5, 3, 1, -4, 2],
        options: {
          type: 'tristate',
          posBarColor: $scope.color.success,
          negBarColor: $scope.color.danger
        }
      };
      $scope.largeChart1 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'line',
          lineColor: $scope.color.info,
          highlightLineColor: '#fff',
          fillColor: $scope.color.info,
          spotColor: false,
          minSpotColor: false,
          maxSpotColor: false,
          width: '100%',
          height: '150px'
        }
      };
      $scope.largeChart2 = {
        data: [3, 1, 2, 3, 5, 3, 4, 2],
        options: {
          type: 'bar',
          barColor: $scope.color.success,
          barWidth: 10,
          width: '100%',
          height: '150px'
        }
      };
      return $scope.largeChart3 = {
        data: [3, 1, 2, 3, 5],
        options: {
          type: 'pie',
          sliceColors: [$scope.color.primary, $scope.color.success, $scope.color.info, $scope.color.infoAlt, $scope.color.warning, $scope.color.danger],
          width: '150px',
          height: '150px'
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('slim.page.ctrls', []).controller('invoiceCtrl', [
    '$scope', '$window', function($scope, $window) {
      return $scope.printInvoice = function() {
        var originalContents, popupWin, printContents;
        printContents = document.getElementById('invoice').innerHTML;
        originalContents = document.body.innerHTML;
        popupWin = window.open();
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
        return popupWin.document.close();
      };
    }
  ]);

}).call(this);
