'use strict'

angular.module('olivWebComponent', [

    # Slim
    'slim'

    # Bower Component
    'ui.bootstrap.showErrors'
    'angularMoment'

    # Oliv
    'oliv.services'
    'oliv.models'
    'oliv.directives'
    'oliv.templates'
])

.config([
    '$routeProvider'
    ($routeProvider) ->
        $routeProvider
            .when('/pages/404', { templateUrl: '404.html'} )
            .when('/pages/500', { templateUrl: '500.html'} )
            .otherwise( redirectTo: '/pages/404' )
])
.config([
    'paginationConfig'
    (paginationConfig) ->
        paginationConfig.directionLinks = false
        paginationConfig.boundaryLinks = true
        paginationConfig.firstText = 'First'
        paginationConfig.lastText = 'Last'
])
