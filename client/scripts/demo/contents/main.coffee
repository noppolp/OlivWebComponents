'use strict'

angular.module('demo.content', [])

.config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when('/dashboard', 
      templateUrl: 'scripts/demo/contents/dashboard.html'
    )
])