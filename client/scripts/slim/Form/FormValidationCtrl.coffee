'use strict'

angular.module('slim.form.validation.ctrls', [])

.controller('wizardFormCtrl', [
    '$scope'
    ($scope) ->
        $scope.wizard =
            firstName: 'some name'
            lastName: ''
            email: ''
            password: ''
            age: ''
            address: ''

        $scope.isValidateStep1 = ->
            console.log $scope.wizard_step1
            console.log $scope.wizard.firstName isnt ''
            console.log $scope.wizard.lastName is ''
            console.log $scope.wizard.firstName isnt '' && $scope.wizard.lastName isnt ''
            # console.log $scope.wizard_step1.$valid


        $scope.finishedWizard = ->
            console.log 'yoo'

])

.controller('formConstraintsCtrl', [
    '$scope'
    ($scope) ->
        $scope.form =
            required: ''
            minlength: ''
            maxlength: ''
            length_rage: ''
            type_something: ''
            confirm_type: ''
            foo: ''
            email: ''
            url: ''
            num: ''
            minVal: ''
            maxVal: ''
            valRange: ''
            pattern: ''

        original = angular.copy($scope.form)

        $scope.revert = ->
            $scope.form = angular.copy(original)
            $scope.form_constraints.$setPristine()

        $scope.canRevert = ->
            return !angular.equals($scope.form, original) || !$scope.form_constraints.$pristine

        $scope.canSubmit = ->
            return $scope.form_constraints.$valid && !angular.equals($scope.form, original)

])

.controller('signinCtrl', [
    '$scope'
    ($scope) ->
        $scope.user =
            email: ''
            password: ''

        $scope.showInfoOnSubmit = false

        original = angular.copy($scope.user)

        $scope.revert = ->
            $scope.user = angular.copy(original)
            $scope.form_signin.$setPristine()

        $scope.canRevert = ->
            return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine

        $scope.canSubmit = ->
            return $scope.form_signin.$valid && !angular.equals($scope.user, original)

        $scope.submitForm = ->
             $scope.showInfoOnSubmit = true
             $scope.revert()
])

.controller('signupCtrl', [
    '$scope'
    ($scope) ->
        $scope.user = 
            name: ''
            email: ''
            password: ''
            confirmPassword: ''
            age: ''

        $scope.showInfoOnSubmit = false

        original = angular.copy($scope.user)

        $scope.revert = ->
            $scope.user = angular.copy(original)
            $scope.form_signup.$setPristine()
            $scope.form_signup.confirmPassword.$setPristine()

        $scope.canRevert = ->
            return !angular.equals($scope.user, original) || !$scope.form_signup.$pristine

        $scope.canSubmit = ->
            return $scope.form_signup.$valid && !angular.equals($scope.user, original)

        $scope.submitForm = ->
             $scope.showInfoOnSubmit = true
             $scope.revert()            

])