﻿'use strict';

angular.module('employeeApp.education', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/education', {
        templateUrl: '/App/education/education.html',
        controller: 'EducationCtrl'
    });
}])

.controller('EducationCtrl', [function () {
    alert("jo from educationCtrl");
}]);