'use strict';

angular.module('myApp.employee', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/App/employee', {
        templateUrl: '/App/employee/employee.html',
        controller: 'EmployeeCtrl'
    });
}])


.controller('EmployeeCtrl', function($scope, $http) {
    //  here we'll load our list of employees from our JSON Web Service 
    $scope.listOfEmployees = null;

    //  When the user selects an "Employee" from our MasterView list, we'll set the following variable.
    $scope.selectedEmployee = null;

    $http.get(serviceUrl)
        .success(function (data) {
            $scope.listOfEmployees = data;

            if ($scope.listOfEmployees.length > 0) {

                //  If we managed to load more than one Employee record, then select the first record by default.
                //  This line of code also prevents AngularJS from adding a "blank" <option> record in our drop down list
                $scope.selectedEmployee = $scope.listOfEmployees[0].Id;
                //  Load the Details
                $scope.loadDetails();
            }
        })
        .error(function (data, status, headers, config) {
            $scope.errorMessage = "Couldn't load the list of employees, error # " + status;
        });

    $scope.selectEmployee = function (val) {
        $scope.selectedEmployee = val.Id;
        $scope.loadDetails();
    }

    $scope.loadDetails = function () {
        //  Reset our list 
        $scope.listOfDetails = null;

        $http.get(serviceUrl + $scope.selectedEmployee)
            .success(function (data) {
                $scope.listOfDetails = data;
            })
            .error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the list of Details, error # " + status;
            });
    }

    $scope.sendPut = function () {
        $http.put(serviceUrl + $scope.selectedEmployee, $scope.listOfDetails)
            .success(function (data, status) {
                alert(data + " " + status);
            });
    }

    $scope.sendPost = function () {
        $http.post(serviceUrl, $scope.listOfDetails)
            .success(function (data, status) {
                alert(data + " " + status);
            });
    }

    $scope.sendDelete = function () {
        $http.delete(serviceUrl + $scope.selectedEmployee)
            .success(function (data, status) {
                alert(data + " " + status);
            });
    }

    $scope.alertJo = function () {
        alert("jo");
    }
});