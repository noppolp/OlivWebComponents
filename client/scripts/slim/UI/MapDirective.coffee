'use strict'

angular.module('slim.ui.map.directives', [])

.directive('uiJvectormap', [ ->

    return {
        restrict: 'A'
        scope:
            options: '='
        link: (scope, ele, attrs) ->
            options = scope.options
            ele.vectorMap(options)
    }
])