'use strict';

angular.module('slim.demo', [
    # Slim Core
    'slim'

    # Demo
    'slim.controllers'
    'slim.ui.ctrls'
    'slim.ui.services'
    'slim.ui.map.ctrls'
    'slim.form.validation.ctrls'
    'slim.ui.form.ctrls'
    'slim.tables'
    'slim.task.ctrls'
    'slim.chart.ctrls'
    'slim.page.ctrls'
])
    
.config([
    '$routeProvider'
    ($routeProvider) ->

        routes = [
            'dashboard'
            'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/boxes', 'ui/timeline', 'ui/nested-lists', 'ui/pricing-tables', 'ui/maps'
            'tables/static', 'tables/dynamic', 'tables/responsive'
            'forms/elements', 'forms/layouts', 'forms/validation', 'forms/wizard'
            'charts/charts', 'charts/flot'
            'pages/404', 'pages/500', 'pages/blank', 'pages/forgot-password', 'pages/invoice', 'pages/lock-screen', 'pages/profile', 'pages/invoice', 'pages/signin', 'pages/signup'
            'mail/compose', 'mail/inbox', 'mail/single'
            'tasks/tasks'
        ]

        setRoutes = (route) ->
            url = '/' + route
            config =
                templateUrl: 'scripts/slim/views/' + route + '.html'

            $routeProvider.when(url, config)
            return $routeProvider

        routes.forEach( (route) ->
            setRoutes(route)
        )
        $routeProvider
            .when('/', { redirectTo: '/dashboard'} )
            .when('/404', { templateUrl: 'views/pages/404.html'} )
            .otherwise( redirectTo: '/404' )
])
