'use strict'

angular.module('oliv.directives')

.directive('loadingTask', [ 
  '$compile' 
  ($compile) ->
    restrict: 'A'
    scope:
      loadingTask: '='
      style: '@loadingStyle'
    link: (scope, element, attrs) ->
      style = scope.style || 'hide'
      template = angular.element('<div class="text-center">loading ...</div>')

      scope.$watch 'loadingTask', (value) ->
        if scope.loadingTask
          options[style](element, template).start()
        else
          options[style](element, template).stop()
])

options = []

options['hide'] = (element, template) ->
  start: ->
    element.hide()
    element.after(template)
  stop: ->
    template.remove()
    element.show()

options['disable'] = (element, template) ->
  start: ->
    element.find(':input').prop('disabled', true)
  stop: ->
    element.find(':input').prop('disabled', false)
    