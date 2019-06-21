$(document).ready(function(){
    clearFields();
    getAllItems();
    getAllCustomersId()
});


//-----------------------get all item code----------------
function getAllItems() {

    var ajaxConfig = {
        Method:"GET",
        url:"http://localhost:8080/api/v1/item",
        async: true

    }

    $.ajax(ajaxConfig).done(function (itemList,textData,jqlr) {

        itemList.forEach(function (item) {
            $("#selectItemCode").append("<option>"+item.code+"</option>");

        });
        }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);


    })

}

//------------get all customer id--------------

function getAllCustomersId() {

    var ajaxConfig = {
        Method:"GET",
        url:"http://localhost:8080/api/v1/customers",
        async: true

    }
  $.ajax(ajaxConfig).done(function (customerList,textData,jqrl) {

      customerList.forEach(function (customer) {
          $("#selectCustomerID").append("<option>"+ customer.id +"</option>")

      })
      }).fail(function (jqxhr, textStatus, errorMsg) {
      console.log(errorMsg);

  })

}

//------------get customerName--------------
$("#selectCustomerID").click(function () {
    var ajaxGetConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true,
    }

    $.ajax(ajaxGetConfig).done(function (customerList, textStatus, iqxhr) {
        customerList.forEach(function (customer) {
            if (customer.id == $("#selectCustomerID").val()) {
                $("#customerName").text(customer.name);
            }
        });

    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });
});



//----------------get Item details-------------------

$("#selectItemCode").click(function () {
    var ajaxGetConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/item",
        async: true,
    }

    $.ajax(ajaxGetConfig).done(function (itemList, textStatus, iqxhr) {
        itemList.forEach(function (item) {
            if (item.code == $("#selectItemCode").val()) {
                $("#itemName").text(item.description);
                $("#itemPrice").text(item.unitPrice);
                $("#itemQty").text(item.qtyOnHand);
            }
        });

    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });
});

var total = 0.00;
$("#orderQtyField").keydown(function () {
    var orderItemCode = $("#selectItemCode").val();
    var orderItemDescription = $("#itemName").text();
    var orderItemUnitPrice = $("#itemPrice").text();
    var orderItemQty = $("#orderQtyField").val();
    var amount = orderItemUnitPrice * orderItemQty;
    total = total + amount;
    if (event.which == '13'){
        console.log(orderItemCode,orderItemDescription,orderItemUnitPrice,orderItemQty,amount);
        loadTable(orderItemCode,orderItemDescription,orderItemUnitPrice,orderItemQty,amount);
        $("#total-heading").text(total);
    }
});


function loadTable(orderItemCode,orderItemDescription,orderItemUnitPrice,orderItemQty,amount) {
    var row="<tr>" +
        "<td>"+orderItemCode+"</td>" +
        "<td>"+orderItemDescription+"</td>" +
        "<td>"+orderItemQty+"</td>" +
        "<td>"+orderItemUnitPrice+"</td>" +
        "<td>"+amount+"</td>" +
        "</tr>";
    $('#tbody').append(row);
}


$("#save-order").click(function () {
    var orderid = $("#orderID").text();
    var orderdate = $("#OrderDate").text();


    var  neworder = {orderid: orderid, orderdate: orderdate};

    var postAjaxConfig = {
        method: "POST",
        url: "http://localhost:8080/api/v1/order",
        async: true,
        data: JSON.stringify(neworder),
        contentType: "application/json"
    }

    $.ajax(postAjaxConfig).done(function (response, textStatus, jqxhr) {
        console.log(response)
        if (response) {
            alert("Order has been successfully added");
            clearFields();
        }else {
            alert("Failed to save order");
        }
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });
});


$("#save-placeOrder").click(function () {

    var orderid = $("#orderId").val();
    var orderDate = $("#orderDate").val();
    var customerId = $("#selectCustomerID").val();

    var order ={};
    var orderDetails =[];
     var i =0;
    while($("tbody tr").length > i){
        i++;
        var code = $("tbody tr:nth-child("+i+") td:nth-child(1)").text();
        var orderqty = $("tbody tr:nth-child("+i+") td:nth-child(3)").text();
        var amount = $("tbody tr:nth-child("+i+") td:nth-child(5)").text();

        var obj = {
            orderId:orderid,
            itemCode:code,
            qty:orderqty,
            unitPrice:amount

        };
        orderDetails.push(obj);
    }
    order = {id:orderid,date:orderDate,customerId:customerId,orderDetails:orderDetails}


    var postAjaxConfig = {
        method: "POST",
        url: "http://localhost:8080/api/v1/order",
        async: true,
        data: JSON.stringify(order),
        contentType: "application/json"
    }

    $.ajax(postAjaxConfig).done(function (response, textStatus, jqxhr) {
        console.log(response)
        if (response) {
            alert("Order has been successfully added");
            clearFields();
        }else {
            alert("Failed to save order");
        }
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });

})

function clearFields() {
    $("table tbody tr").remove();
    $("#orderQtyField").val("");
    $("#txtitemName").text("");
    $("#txtitemQty").text("");
    $("#txtitemPrice").text("");
    total = 0;
}

