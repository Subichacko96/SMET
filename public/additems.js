var customerName;
var orderId;
var customerNo;
var TableNo;
var itemName;
var quantity;
var itemId;
var itemName;
var takeaway;
var itemPrice;
var parcelQty;
var order = {};

var tableHead = `<table class="table">
<thead>
  <tr>
    
    <th scope="col">Item</th>
    <th scope="col">Rate</th>
    <th scope="col">Qty</th>
    <th scope="col"> Total </th>
  </tr>
</thead>
<tbody>`;
var tableBottom = `  </tbody></table>`;

const getData = () => {
  customerName = document.getElementById('customerName').value;
  phoneNo = document.getElementById('phoneno').value;
  tableNo = document.getElementById('tableNo').value;
  itemName = document.getElementById('itemName').value;
  orderId = document.getElementById('orderId').value || null;

  order.customer_name = customerName;
  order.customer_mobNo = phoneNo;
  order.table_no = tableNo;
  order.orderId = orderId;
  console.log(order);
};

const GetItem = () => {
  var viewOrder = document.getElementById('finalOrder');
  var parcelOrder = document.getElementById('parcelOrder');
  var finalBill = document.getElementById('finalBill');
  var waiterName = document.getElementById('waitername').value;
  let billTotel = 0;
  var result = [];
  var textvalue = ' ';
  var parcelvalue = ' ';
  quantity = document.getElementsByClassName('qty');
  itemId = document.getElementsByClassName('itemId');
  itemName = document.getElementsByClassName('itemName');
  itemPrice = document.getElementsByClassName('itemPrice');
  takeaway = document.getElementsByClassName('takeawayCheck');
  privilege = document.getElementById('privilegd') || 0;
  parcelQty = document.getElementsByClassName('parcelQty');
  for (var i = 0, len = itemId.length | 0; i < len; i = (i + 1) | 0) {
    if (takeaway[i].checked) {
      result.push({
        order_type: 'takeaway',
        parcelQty: parcelQty[i].value,
        item_id: itemId[i].value,
        item_name: itemName[i].value,
        item_price: itemPrice[i].value,
      });
      let totel = Number(parcelQty[i].value) * Number(itemPrice[i].value);
      billTotel += totel;
      parcelvalue += ` <tr> <td>${itemName[i].value}</td> <td> ${itemPrice[i].value} </td><td> ${parcelQty[i].value}  </td><td>  ${totel} </td></tr>`;
    }
    if (Number(quantity[i].value) > 0) {
      let totel = Number(quantity[i].value) * Number(itemPrice[i].value);
      billTotel += totel;
      textvalue += `<tr> <td>${itemName[i].value} </td> <td> ${itemPrice[i].value} </td> <td> ${quantity[i].value}  </td> <td>  ${totel}</td></tr>`;
      result.push({
        item_id: itemId[i].value,
        item_name: itemName[i].value,
        item_price: itemPrice[i].value,
        qty: quantity[i].value,
      });
    }
  }
  order.items = result;
  order.total_bill = billTotel;
  order.waiter_name = waiterName;
  //var text = document.createNode(textvalue);
  viewOrder.innerHTML = tableHead + textvalue + parcelvalue + tableBottom;
  //parcelOrder.innerHTML = tableHead + parcelvalue + tableBottom;
  finalBill.innerHTML = `<strong> total  : </strong>${billTotel}`;
};

$(document).ready(function () {
  $('#submitButton').click(function () {
    if (privilege.checked) {
      let preData = {
        name: customerName,
        phone: order.customer_mobNo,
      };
      $.post('addprivilege', preData, function (data, status) {
        console.log(data);
        if (data.success) {
          //pageRedirect();
        }
      });
    }

    $.post('submitorder', order, function (data, status) {
      if (data.success) {
        pageRedirect();
      }
    });
  });
});

$(document).ready(function () {
  $('#updateButton').click(function () {
    $.post('/waiter/updateorder', order, function (data, status) {
      // console.log(data.success);
      if (data.success) {
        pageRedirect();
      }
    });
  });
});

function pageRedirect() {
  window.location.href = '/waiter/dashboard';
}
