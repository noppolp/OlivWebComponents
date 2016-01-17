'use strict';

angular.module('demo', [
    'olivWebComponent'
    'demo.header'
    'demo.nav'
    'demo.content'
])

.config([
    '$routeProvider'
    ($routeProvider) ->

        $routeProvider
            .when('/', {
                redirectTo: '/dashboard'
            })
])

.controller('AppCtrl', [
    '$scope', '$rootScope', '$route', '$document',
    ($scope, $rootScope, $route, $document) ->
        $window = $(window)

        $scope.pageTransitionOpts = [
            name: 'Fade up'
            class: 'animate-fade-up'
        ,
            name: 'Scale up'
            class: 'ainmate-scale-up'
        ,
            name: 'Slide in from right'
            class: 'ainmate-slide-in-right'
        ,
            name: 'Flip Y'
            class: 'animate-flip-y'
        ]

        $scope.admin =
            layout: 'wide'                                  # 'boxed', 'wide'
            menu: 'vertical'                                # 'horizontal', 'vertical'
            fixedHeader: true                               # true, false
            fixedSidebar: true                              # true, false
            pageTransition: $scope.pageTransitionOpts[0]    # unlimited, check out "_animation.scss"
            skin: '11'                                      # 11,12,13,14,15,16; 21,22,23,24,25,26;; 31,32,33,34,35,36

        $scope.color =
            primary:        '#5B90BF'
            success:        '#A3BE8C'
            info:           '#7FABD2'
            infoAlt:        '#B48EAD'
            warning:        '#EBCB8B'
            danger:         '#BF616A'
            gray:           '#DCDCDC'

        $rootScope.$on("$routeChangeSuccess", (event, currentRoute, previousRoute) ->
            $document.scrollTo(0, 0);
        )
])
