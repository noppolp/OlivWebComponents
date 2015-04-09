'use strict';

HeaderSectionCtrl = [
  '$scope', '$location'
  ($scope, $location) ->
    vm = this
    $scope.signout = ->
      $location.path('/signin')
    return
]

angular.module('demo.header', [])

.directive('headerSection', [ ->
  restrict: 'E'
  scope: {}
  templateUrl: 'scripts/demo/header/header.html'
  controller: HeaderSectionCtrl
  controllerAs: 'vm'
])
