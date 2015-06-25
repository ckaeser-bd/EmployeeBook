'use strict';

// Declare app level module which depends on views, and components
var employeeApp = angular.module('employeeApp', [
    'ngRoute',
    'employeeApp.education',
    'employeeApp.employee'
]);

employeeApp.
    config([
        '$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({ redirectTo: '/App/employee' });
        }
    ]);

// Declare sub-App-level module
var employee = angular.module('employeeApp.employee', ['ngRoute']);