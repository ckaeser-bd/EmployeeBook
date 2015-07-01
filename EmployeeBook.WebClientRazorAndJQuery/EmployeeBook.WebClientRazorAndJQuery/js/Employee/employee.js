//var the webApi URI
//var webApiUri = "http://localhost:8099/api/employee/";
var webApiUri = "http://employeewebapitest.azurewebsites.net/api/employee/";

// the employees will be cached here after retrieval
var employees = {};
// the currently selected employee
var selectedEmployee = null;
//helper method to find an employee by Id
var findEmployeeById = function(id) {
    for (var i = 0, len = employees.length; i < len; i++) {
        if (employees[i].Id === id)
            return employees[i]; // Return as soon as the object is found
    }
    return null; // The object was not found
}

$(document).ready(function() {
    GetAllEmployees();
});

function GetAllEmployees() {
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            employees = data;
            WriteResponse(data);
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function addEmployee() {
    selectedEmployee = null;
    $("#firstName").val("");
    $("#lastName").val("");
    $("#firstName").focus();
}

$('#deleteEmployee').bind("click", deleteEmployee);
function deleteEmployee() {
    jQuery.support.cors = true;
    var id = selectedEmployee.Id;

    $.ajax({
        url: webApiUri + id,
        type: 'DELETE',
        contentType: "application/json;charset=utf-8",
        success: function() {
            GetAllEmployees();
            selectedEmployee = null;
            $("#firstName").val("");
            $("#lastName").val("");
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function WriteResponse(employees) {
    var strResult = "<table><th>Id</th><th>Emp Name</th>";
    $.each(employees, function(index, employee) {
        strResult += "<tr onclick='setSelectedEmployee(" + employee.Id + ");'><td>" + employee.Id + "</td><td> " + employee.FirstName + " " + employee.LastName + "</td></tr>";
    });
    strResult += "</table>";
    $("#employeeList").html(strResult);
}

function setSelectedEmployee(employeeId) {
    selectedEmployee = findEmployeeById(employeeId);
    if (selectedEmployee != null) {
        $("#firstName").val(selectedEmployee.FirstName);
        $("#lastName").val(selectedEmployee.LastName);

    } else {
        $("#employeeList").html("No Results To Display");
    }
}

function GetEmployee() {
    jQuery.support.cors = true;
    var id = $('#txtEmpid').val();
    $.ajax({
        url: webApiUri + id,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            setSelectedEmployee(data);
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

$('#saveEmployee').bind("click", putOrPostEmployee);
function putOrPostEmployee() {
    var lastName = $("#lastName").val();
    var firstName = $("#firstName").val();
    jQuery.support.cors = true;
    var dataJson;
    if (selectedEmployee) {
        // put
        var id = selectedEmployee.Id;
        dataJson = { "Id": id, "LastName": lastName, "FirstName": firstName };
        $.ajax({
            type: 'PUT',
            url: webApiUri + id,
            data: JSON.stringify(dataJson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function() {
                GetAllEmployees();
            }
        });

    } else {
        // post 
        dataJson = { "LastName": lastName, "FirstName": firstName };
        $.ajax({
            type: 'POST',
            url: webApiUri,
            data: JSON.stringify(dataJson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function() {
                GetAllEmployees();
            }
        });
    }

}