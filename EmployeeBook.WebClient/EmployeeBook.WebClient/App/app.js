'use strict';

var serviceUrl = 'http://localhost:8099/api/employee/';
//var serviceUrl = 'http://employeewebapi.azurewebsites.net/api/employee/';


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

var employee = angular.module('employeeApp.employee', ['ngRoute']);