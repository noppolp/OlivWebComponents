'use strict';

DirectiveCtrl = [
  '$scope','$timeout'
  ($scope, $timeout) ->

    reload = ->
      vm.loading = true
      $timeout ->
        vm.loading = false
      , 1000

    vm = this
    vm.reload = reload

    vm.reload()
    return
]

angular.module('demo.content')

.config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when('/directive', 
      templateUrl: 'scripts/demo/contents/directive.html'
      controller: DirectiveCtrl
      controllerAs: 'vm'
    )
])