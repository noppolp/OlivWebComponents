'use strict';

angular.module('olivWebComponent', [

    # Slim
    'slim'

    # Bower Component
    'ui.bootstrap.showErrors'

    # Oliv
    'oliv.services'
    'oliv.models'
    'oliv.directives'
])

.config([
    '$routeProvider'
    ($routeProvider) ->
        $routeProvider
            .when('/404', { templateUrl: 'scripts/slim/views/pages/404.html'} )
            .when('/500', { templateUrl: 'scripts/slim/views/pages/500.html'} )
            .otherwise( redirectTo: '/404' )
])
.config([
    'paginationConfig'
    (paginationConfig) ->
        paginationConfig.directionLinks = false
        paginationConfig.boundaryLinks = true
        paginationConfig.firstText = 'First'
        paginationConfig.lastText = 'Last'
])
