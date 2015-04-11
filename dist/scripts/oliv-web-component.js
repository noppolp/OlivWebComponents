(function() {
  'use strict';
  angular.module('olivWebComponent', ['slim', 'ui.bootstrap.showErrors', 'oliv.services', 'oliv.models', 'oliv.directives']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/404', {
        templateUrl: 'scripts/slim/views/pages/404.html'
      }).when('/500', {
        templateUrl: 'scripts/slim/views/pages/500.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]).config([
    'paginationConfig', function(paginationConfig) {
      paginationConfig.directionLinks = false;
      paginationConfig.boundaryLinks = true;
      paginationConfig.firstText = 'First';
      return paginationConfig.lastText = 'Last';
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('oliv.services', []);

}).call(this);

;
(function() {
  'use strict';
  angular.module('oliv.services').factory('confirmModal', [
    '$modal', function($modal) {
      return {
        open: function(title, body, result) {
          var modalInstance, template;
          title = title || 'Confirm Delete';
          body = body || '';
          template = '<div class="modal-header">' + '<h3 class="modal-title">' + title + '</h3>' + '</div>' + '<div class="modal-body">' + body + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-primary" ng-click="$close(vm.result)">OK</button>' + '<button class="btn btn-default" ng-click="$dismiss(vm.result)">Cancel</button>' + '</div>';
          modalInstance = $modal.open({
            template: template,
            size: 'sm',
            windowClass: 'confirm-modal',
            controller: function() {
              var vm;
              vm = this;
              vm.result = result;
            },
            controllerAs: 'vm'
          });
          return modalInstance.result;
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('oliv.models', ['rails']).config([
    'RailsResourceProvider', function(RailsResourceProvider) {
      RailsResourceProvider.fullResponse(true);
      return RailsResourceProvider.rootWrapping(false);
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  angular.module('oliv.directives', []);

}).call(this);

;
(function() {
  'use strict';
  angular.module('oliv.directives').directive('fileModel', [
    '$parse', function($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model, modelSetter;
          model = $parse(attrs.fileModel);
          modelSetter = model.assign;
          return element.bind('change', function() {
            return scope.$apply(function() {
              return modelSetter(scope, element[0].files[0]);
            });
          });
        }
      };
    }
  ]);

}).call(this);

;
(function() {
  'use strict';
  var options;

  angular.module('oliv.directives').directive('loadingTask', [
    '$compile', function($compile) {
      return {
        restrict: 'A',
        scope: {
          loadingTask: '=',
          style: '@loadingStyle'
        },
        link: function(scope, element, attrs) {
          var style, template;
          style = scope.style || 'hide';
          template = angular.element('<div class="text-center">loading ...</div>');
          return scope.$watch('loadingTask', function(value) {
            if (scope.loadingTask) {
              return options[style](element, template).start();
            } else {
              return options[style](element, template).stop();
            }
          });
        }
      };
    }
  ]);

  options = [];

  options['hide'] = function(element, template) {
    return {
      start: function() {
        element.hide();
        return element.after(template);
      },
      stop: function() {
        template.remove();
        return element.show();
      }
    };
  };

  options['disable'] = function(element, template) {
    return {
      start: function() {
        return element.find(':input').prop('disabled', true);
      },
      stop: function() {
        return element.find(':input').prop('disabled', false);
      }
    };
  };

}).call(this);
