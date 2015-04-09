'use strict';

angular.module('oliv.models', ['rails'])

.config([
  'RailsResourceProvider'
  (RailsResourceProvider) ->
    RailsResourceProvider.fullResponse(true)
    RailsResourceProvider.rootWrapping(false)
])