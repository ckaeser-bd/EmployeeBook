/*
Rest Web Api 2 Service facade for employees
*/
employeeApp.service('employeeService', function ($http) {
    var serviceUrl = 'http://localhost:8099/api/employee';

    this.getEmployees = function () {
        return $http.get(serviceUrl);
    };

    this.getEmployee = function (id) {
        return $http.get(serviceUrl + '/' + id);
    };

    this.insertEmployee = function (employee) {
        return $http.post(serviceUrl, employee);
    };

    this.updateEmployee = function (employee) {
        if (employee.Id > 0) {
            return $http.put(serviceUrl + '/' + employee.Id, employee);
        } else {
            return this.insertEmployee(employee);
        }
    };

    this.deleteEmployee = function (id) {
        return $http.delete(serviceUrl + '/' + id);
    };
});