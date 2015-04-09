'use strict';

angular.module('slim', [
    # Angular modules
    'ngRoute'
    'ngAnimate'

    # 3rd Party Modules
    'ui.bootstrap'
    'easypiechart'
    'ui.tree'
    'ngMap'
    'ngTagsInput'
    'angular-loading-bar'
    'duScroll'

    # Custom modules
    'slim.directives'
    'slim.localization'
    'slim.nav'
    'slim.ui.directives'
    'slim.ui.services'
    'slim.ui.map.directives'
    'slim.form.validation.directives'
    'slim.ui.form.directives'
    'slim.task.directives'
    'slim.chart.directives'
])