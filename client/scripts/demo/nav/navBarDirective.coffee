'use strict';

NavBarCtrl = ->
    vm = this

angular.module('demo.nav', [])

.directive('navBar', [ ->
  restrict: 'E'
  scope: {}
  templateUrl: 'scripts/demo/nav/nav.html'
  controller: NavBarCtrl
  controllerAs: 'vm'
])