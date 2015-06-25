'use strict';

employee
    .config([
        '$routeProvider', function($routeProvider) {
            $routeProvider.when('/App/employee', {
                templateUrl: '/App/employee/employee.html',
                controller: 'EmployeeCtrl'
            });
        }
    ])
    .controller('EmployeeCtrl', function($scope, $http, employeeService) {
            //  here we'll load our list of employees from our JSON Web Service 
            $scope.listOfEmployees = [];
            //  When the user selects an "Employee" from our MasterView list, we'll set the following variable.
            $scope.selectedEmployee = [];

            employeeService.getEmployees().success(function(data) {
                $scope.listOfEmployees = data;
            });

            $scope.selectEmployee = function(val) {
                $scope.listOfDetails = [];
                $scope.selectedEmployee = val.Id;
                employeeService.getEmployee(val.Id).success(function(data) {
                    $scope.listOfDetails = data;
                });
            }

            $scope.updateEmployee = function () {
                console.log("update employee");
                employeeService.updateEmployee($scope.listOfDetails);
            }

            $scope.deleteEmployee = function () {
                console.log("delete employee");
                employeeService.deleteEmployee($scope.selectedEmployee);
            }

            $scope.insertEmployee = function () {
                $scope.listOfDetails = [];
            }
        }
    );