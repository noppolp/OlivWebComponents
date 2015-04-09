'use strict';

ServiceCtrl = [
  '$scope','$window','confirmModal'
  ($scope, $window, confirmModal) ->

    confirm = (title, body, result) ->
      confirmModal.open(title, body, result).then (_result) ->
        $window.alert(_result || 'confirmed')

    vm = this
    vm.confirm = confirm

    return
]

angular.module('demo.content')

.config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when('/service', 
      templateUrl: 'scripts/demo/contents/service.html'
      controller: ServiceCtrl
      controllerAs: 'vm'
    )
])