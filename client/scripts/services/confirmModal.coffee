'use strict';

angular.module('oliv.services')

.factory('confirmModal', [
  '$modal'
  ($modal) ->

    open: (title, body, result) ->
      title = title || 'Confirm Delete'
      body = body || ''

      template = 
        '<div class="modal-header">'+
          '<h3 class="modal-title">'+title+'</h3>'+
        '</div>'+
        '<div class="modal-body">'+
          body+
        '</div>'+
        '<div class="modal-footer">'+
          '<button class="btn btn-primary" ng-click="$close(vm.result)">OK</button>'+
          '<button class="btn btn-default" ng-click="$dismiss(vm.result)">Cancel</button>'+
        '</div>'

      modalInstance = $modal.open(
        template: template
        size: 'sm'
        windowClass: 'confirm-modal'
        controller: ->
          vm = this
          vm.result = result
          return
        controllerAs: 'vm'
      )
      return modalInstance.result
])