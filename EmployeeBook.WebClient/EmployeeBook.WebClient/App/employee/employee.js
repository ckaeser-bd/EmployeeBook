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
            // region function declarations
            $scope.getEmployees = function() {
                employeeService.getEmployees().success(function(data) {
                    $scope.listOfEmployees = data;
                });
            }

            $scope.selectEmployee = function(val) {
                $scope.listOfDetails = [];
                $scope.selectedEmployee = val.Id;
                employeeService.getEmployee(val.Id).success(function(data) {
                    $scope.listOfDetails = data;
                });
            }

            $scope.updateEmployee = function() {
                console.log("update employee");
                employeeService.updateEmployee($scope.listOfDetails).success($scope.getEmployees());
            }

            $scope.deleteEmployee = function() {
                console.log("delete employee");
                $scope.listOfEmployees.splice($scope.listOfEmployees.indexOf($scope.selectedEmployee), 1);
                employeeService.deleteEmployee($scope.selectedEmployee);
            }

            $scope.insertEmployee = function() {
                var employee = { "Id": -1, "LastName": "ADD", "FirstName": "PERSON" };
                $scope.listOfDetails = employee;
                $scope.listOfEmployees.push(employee);
            }
            // endregion function declarations

            //Init Stuff

            //here we'll load our list of employees from our JSON Web Service 
            $scope.listOfEmployees = [];
            //When the user selects an "Employee" from our MasterView list, we'll set the following variable.
            $scope.selectedEmployee = [];
            //initial load of employees
            $scope.getEmployees();
        }
    );