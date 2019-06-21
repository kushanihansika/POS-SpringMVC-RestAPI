
$(document).ready(function(){
    clearFields();
    getAllCustomers();
    genarateCustomerId();
    deleteCustomer();
    checkEmpty();
    checkValidate();

});


//-------- Load All Customers---------------

function getAllCustomers() {

    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true
    }

    $.ajax(ajaxConfig).done(function (customerList, textStatus, iqxhr) {
        $("table tbody tr").remove();
        customerList.forEach(function (customer) {
         var html= "<tr>"
            + "<td>" + customer.id + "</td>"
            + "<td>" + customer.address + "</td>"
            + "<td>" + customer.name + "</td>"
             +"<td><img src='images/recyclebin.png' width='30px'></td>"
            + "</tr>"
            $("table tbody ").append(html);
        });

    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });

    //----------------------delete Customer--------------------------

    $('tbody tr td img').click(function () {
        var custID = $(this).parents('tr').find('td:first-child').html();
        var row =  $(this).parents('tr');
        console.log(custID)
        var deleteAjaxConfig ={
            method:"DELETE",
            url:"http://localhost:8080/api/v1/customers/"+custID,
            async:true,
            dataType: 'json',
            contentType: 'application/json',
            data:JSON.stringify({custID:custID})
        }

        $.ajax(deleteAjaxConfig).done(function (response, textStatus, jqxhr) {
            if (jqxhr.status === 204){
                alert("Customer has been successfully Deleted");
                $(row).remove();
                generateCustomerID();
            }if (jqxhr.status === 400) {
                alert("Failed to delete Customer");
            }
        }).fail(function (error) {
            console.log(error);
        });
    });





}

//--------save Customers---------------


$("#btn-save").click(function () {
    var id =$("#txtCustomerID").val();
    var address =$("#txtCustomerIName").val();
    var name =$("#txtCustomerAddress").val();

    var  newCust = {id: id,address: address, name: name};

    var postAjacConfig ={

        method:"POST",
        url:"http://localhost:8080/api/v1/customers",
        async: true,
        data:JSON.stringify(newCust),
        contentType: "application/json"

    }

    $.ajax(postAjacConfig).done(function (respone,textStatus,jqr) {
         if (respone){
             console.log("customer")
             alert("Customer Save success ")
             getAllCustomers();
         }else {
             alert("failed to save customer")
         }
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });
})


//----------genaratecustomer Value-------------------


function genarateCustomerId() {

    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true
    }

    $.ajax(ajaxConfig).done(function (customerLsit,textStatus,iqxhr) {
        var custid;
        customerLsit.forEach(function (custids) {
            custid = custids.id;
        });
        var value = custid.substr(1,4);
        console.log("C00"+(parseInt(value)+1))
        $("#txtCustomerID").val("C00"+(parseInt(value)+1));
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });

}
//--------------------------------------click clear button-------------------------------------
$("#btn-clear").click(function () {
    console.log("clear")
    clearFields();
})

function deleteCustomer() {


}

//--------------------------------------clear Field-------------------------------------
function clearFields() {
    $("#txtCustomerID").val("");
    $("#txtCustomerIName").val("");
    $("#txtCustomerAddress").val("");
}

function checkEmpty(name,address) {
    if ($.trim(name).length == 0){
        $("#txtCustomerIName").css("border-color","red");
        console.log("Customer Name is empty");
        $("#txtCustomerIName").focus();
        return false;
    } else if ($.trim(address).length == 0){
        $("#txtCustomerIName").css("border-color","lightgrey");
        $("#txtCustomerAddress").css("border-color","red");
        console.log("Customer Address is empty");
        $("#txtCustomerAddress").focus();
        return false;
    }else {
        $("#txtCustomerIName").css("border-color","lightgrey");
        $("#txtCustomerAddress").css("border-color","lightgrey");
        return true;
    }
};

function checkValidate(name,address) {
    var validateName = /^[A-Za-z]+$/;
    var validateAddress = /^[A-Za-z0-9]+$/;

    if (!validateName.test(name)){
        $("#txtCustomerIName").css("border-color","red");
        $("#txtCustomerIName").focus();
        alert("incorrect name");
        return false;
    }else if (!validateAddress.test(address)){
        grey();
        $("#txtCustomerAddress").css("border-color","red");
        $("#txtCustomerAddress").focus();
        alert("incorrect address");
        return false;
    }else {
        console.log("validate Success");
        grey();
        return true;
    }
}

function grey() {
    $("#txtCustomerIName").css("border-color","lightgrey");
    $("#txtCustomerAddress").css("border-color","lightgrey");
}

$("#txtCustomerIName").click(function () {
    grey();
});
$("#txtCustomerAddress").click(function () {
    grey();
});


