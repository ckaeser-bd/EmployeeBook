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

// get all Employees on page load!
$(document).ready(function() {
    GetAllEmployees();
});

// function definition
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
        success: function () {
            GetAllEmployees();
            selectedEmployee = null;
            $("#firstName").val("");
            $("#lastName").val("");
        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function GetAllEmployees() {
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            employees = data;
            WriteEmployeeTable(data);
        },
        error: function(x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}

function GetEmployeeDetail(employeeId) {
    jQuery.support.cors = true;
    $.ajax({
        url: webApiUri + employeeId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            WriteEducationTable(data);
        },
        error: function (x, y, z) {
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

function setSelectedEmployee(employeeId) {
    selectedEmployee = findEmployeeById(employeeId);
    if (selectedEmployee != null) {
        GetEmployeeDetail(employeeId);
        $("#firstName").val(selectedEmployee.FirstName);
        $("#lastName").val(selectedEmployee.LastName);

    } else {
        $("#employeeList").html("No Results To Display");
    }

}

function WriteEmployeeTable(employees) {
    var strResult = "<table><th>Id</th><th>Emp Name</th>";
    $.each(employees, function (index, employee) {
        strResult += "<tr class='employeeTable' onclick='setSelectedEmployee(" + employee.Id + ");'><td>" + employee.Id + "</td><td> " + employee.FirstName + " " + employee.LastName + "</td></tr>";
    });
    strResult += "</table>";
    $("#employeeList").html(strResult);
}

function WriteEducationTable(employee) {
    var strResult = "<table border='1'><th>Id</th><th>Name</th><th>Start</th><th>End</th>";
    employee.Educations.forEach(function (education) {
        strResult += "<tr><td>" + education.Id + "</td><td>" + education.Name + "</td>";
        strResult += "<td>" + moment(education.Start).locale("de").format('L') + "</td><td>" + moment(education.End).locale("de").format('L') + "</td></tr>";
    });

    strResult += "</table>";
    $("#educationList").html(strResult);
}
// end function

// styling
// hightlight currently selected row
$('#employeeList').on('click', 'table tr', function () {
    $(this).closest("tr").siblings().removeClass("alert-danger");
    $(this).toggleClass("alert-danger", this.clicked);
});

// end styling