'use strict';

var serviceUrl = 'http://localhost:8099/api/employee/';
//var serviceUrl = 'http://employeewebapi.azurewebsites.net/api/employee/';
var serviceUrlDocuments = 'http://localhost:8099/api/document/';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.education',
  'myApp.employee'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/App/employee' });
}]);
