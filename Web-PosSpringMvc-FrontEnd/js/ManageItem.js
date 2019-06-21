$(document).ready(function(){
    clearFields();
    getAllItems();
    genarateItemId();
});



function getAllItems() {

    var ajaxConfig={
        Method:"GET",
        url:"http://localhost:8080/api/v1/item",
        async: true

    }
    $.ajax(ajaxConfig).done(function (itemList,textStatus, iqxhr) {
        $("table tbody tr").remove();
        itemList.forEach(function (item) {
        var html= "<tr>"
            + "<td>" + item.code + "</td>"
            + "<td>" + item.description + "</td>"
            + "<td>" + item.qtyOnHand + "</td>"
            + "<td>" + item.unitPrice + "</td>"
            + "</tr>"
            $("table tbody ").append(html);
        });
    }).fail(function (j, textStatus, errorMsg) {
        console.log(errorMsg);
    });
}

//---------------genarate Item id--------------
function   genarateItemId(){


    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/item",
        async: true
    }

    $.ajax(ajaxConfig).done(function (itemList,textStatus,iqxhr) {
        var itemId;
        itemList.forEach(function (itemIds) {
            itemId = itemIds.code;
        });
        var value = itemId.substr(1,4);
        console.log("P00"+(parseInt(value)+1))
        $("#txtItemCode").val("P00"+(parseInt(value)+1));
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });

}


$("#btn-save").click(function () {

    var code = $("#txtItemCode").val();
    var description = $("#txtItemDescription").val();
    var qtyOnHand = $("#txtItemQty").val();
    var unitPrice = $("#txtItemUnitPrice").val();


    var newItem = {code:code, description:description, qtyOnHand:qtyOnHand, unitPrice:unitPrice}

    var postAjacConfig ={

        method:"POST",
        url:"http://localhost:8080/api/v1/item",
        async: true,
        data:JSON.stringify(newItem),
        contentType: "application/json"

    }
    $.ajax(postAjacConfig).done(function (respone,textStatus,jqr) {
        if (respone){
            alert("Item Save")
            getAllItems();
        }else {
            alert("failed to save Item");
        }
    }).fail(function (jqxhr, textStatus, errorMsg) {
        console.log(errorMsg);
    });

})

$("#btn-clear").click(function () {
    console.log("clear")
    clearFields();
})


//--------------------------------------clear Field-------------------------------------
function clearFields() {
    $("#txtItemCode").val("");
    $("#txtItemDescription").val("");
    $("#txtItemQty").val("");
    $("#txtItemUnitPrice").val("");
}
function genarateItemId() {
    var appConfig = {

        
    }
}