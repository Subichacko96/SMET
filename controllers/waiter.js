const db = require('../helpers/app/userHelper');
exports.index = (req, res) => {
  if (req.user.role == 'cashier') {
    return res.redirect('/cashier/dashboard');
  }

  return res.render('./waiter/home', {
    title: 'dashbord',
    user: 'Waiter user',
  });
};

exports.neworder = async (req, res) => {
  try {
    let items = [];

    let waitername = req.user.name;
    const cat = await db.listCategory();
    //console.log(cat.data);
    const getFoodItem = async (arr) => {
      var foodList = [];

      for (const elem of arr) {
        let subList = [];
        let idList = [];
        let nameList = [];
        const itemName = await db.itemsByCategory(elem._id);
        itemName.forEach((e) => {
          subList.push({ id: e._id, name: e.name, price: e.price });
        });

        foodList.push({
          cat: elem.name,
          food: subList,
        });
      }
      return foodList;
    };
    let returnData = await getFoodItem(cat.data);
    //console.log(returnData);

    return res.render('waiter/neworder', {
      title: 'View Food Items',
      name: req.user.name,
      data: returnData,
      waitername: waitername,
    });
  } catch (error) {}
};

exports.submitOrder = async (req, res) => {
  try {
    let orders = req.body;
    const submittedData = await db.addOrder(orders);

    return res.send({
      StatusCode: 200,
      success: true,
    });
  } catch {}
};

exports.listOrder = async (req, res) => {
  try {
    let mainList = [];
    const orderItems = await db.listOrders();
    orderItems.data.forEach((e) => {
      let subList = [];

      e.items.forEach((item) => {
        subList.push({
          itemName: item.item_name,
          order_type: item.order_type,
          qty: item.qty || item.parcelQty,
        });
      });

      mainList.push({
        id: e._id,
        table_no: e.table_no,
        name: e.customer_name,
        items: subList,
      });
    });

    return res.render('waiter/listorder', {
      title: 'View ordes',
      name: req.user.name,
      data: mainList,
    });
  } catch (error) {}
};

exports.editorder = async (req, res) => {
  try {
    let orderData = await db.getOrders(req.params.id);
    console.log(orderData);
    let orderId = orderData.data._id;
    let waiterName = orderData.data.waiter_name;
    let customerName = orderData.data.customer_name;
    let phoneNo = orderData.data.customer_mobNo;
    let tableNo = orderData.data.table_no;

    let items = [];
    const cat = await db.listCategory();
    //console.log(cat.data);
    const getFoodItem = async (arr) => {
      var foodList = [];

      for (const elem of arr) {
        let subList = [];
        let idList = [];
        let nameList = [];
        const itemName = await db.itemsByCategory(elem._id);
        itemName.forEach((e) => {
          subList.push({ id: e._id, name: e.name, price: e.price });
        });

        foodList.push({
          cat: elem.name,
          food: subList,
        });
      }
      return foodList;
    };
    let returnData = await getFoodItem(cat.data);
    //console.log(returnData);

    return res.render('waiter/updateorder', {
      title: 'View Food Items',
      name: req.user.name,
      data: returnData,
      customerName: customerName,
      phoneNo: phoneNo,
      tableNo: tableNo,
      orderid: orderId,
      waiterName: waiterName,
    });
  } catch (error) {}
};

exports.updateOrder = async (req, res) => {
  try {
    let orders = req.body;
    let newItems = orders.items;
    let newCname = orders.customer_name;
    let newMno = orders.customer_mobNo;
    let newTno = orders.table_no;
    let orderId = orders.orderId;
    let total_bill = orders.total_bill;

    const updatedData = await db.updateOrder(
      orderId,
      newCname,
      newMno,
      newTno,
      newItems,
      total_bill
    );
    console.log(updatedData);

    return res.send({
      StatusCode: 200,
      success: true,
    });
  } catch {}
};

exports.vieworder = async (req, res) => {
  try {
    let orderData = await db.getOrders(req.params.id);
    let waiterName = orderData.data.waiter_name;

    let orderId = orderData.data._id;
    let customerName = orderData.data.customer_name;
    let phoneNo = orderData.data.customer_mobNo;
    let tableNo = orderData.data.table_no;
    let items = orderData.data.items;
    let subList = [];

    items.forEach((item) => {
      subList.push({
        itemName: item.item_name,
        order_type: item.order_type,
        qty: item.qty || item.parcelQty,
      });
    });
    return res.render('waiter/vieworder', {
      title: 'View Food Items',
      name: req.user.name,
      customerName: customerName,
      phoneNo: phoneNo,
      tableNo: tableNo,
      orderid: orderId,
      items: subList,
      waiterName: waiterName,
    });
  } catch (error) {}
};

exports.cancelOrder = async (req, res) => {
  try {
    let orderData = await db.getOrders(req.params.id);

    let orderId = orderData.data._id;
    let customerName = orderData.data.customer_name;
    let phoneNo = orderData.data.customer_mobNo;
    let tableNo = orderData.data.table_no;
    let items = orderData.data.items;
    let waiterName = orderData.data.waiter_name;

    let subList = [];

    items.forEach((item) => {
      console.log(item);
      subList.push({
        id: item._id,
        itemName: item.item_name,
        order_type: item.order_type,
        qty: item.qty || item.parcelQty,
      });
    });
    return res.render('waiter/cancelorder', {
      title: 'View Food Items',
      name: req.user.name,
      customerName: customerName,
      phoneNo: phoneNo,
      tableNo: tableNo,
      orderid: orderId,
      items: subList,
      waiterName: waiterName,
    });
  } catch (error) {}
};

exports.cancelSubmit = async (req, res) => {
  try {
    let orderId = req.body.orderId;
    let itemId = req.body.itemId;
    let deleteData = await db.deleteOrder(orderId, itemId);
    if (deleteData.success) {
      return res.redirect('/waiter/listorder');
    }
    console.log(data);
  } catch (error) {}
};

exports.deleteFull = async (req, res) => {
  try {
    let deleteData = await db.deleteFullOrder(req.params.id);
    console.log(deleteData);
    if (deleteData.success) {
      return res.redirect('/waiter/listorder');
    }
    console.log(data);
  } catch (error) {}
};

//Privilege Card

exports.addPrivilegeCard = async (req, res) => {
  try {
    if (req.method === 'POST') {
      console.log(req.body);
      let customerData = await db.addCard(req.body);
      console.log(customerData);
      if (customerData.statusCode === 200) {
        req.flash('success', {
          msg: 'Customer Added Successfully',
        });
      } else if (customerData.statusCode === 409) {
        req.flash('errors', {
          msg: 'Customer Allredy Exist',
        });
      }
      return res.send({
        StatusCode: 200,
        success: true,
      });
    } else {
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'Error occured while adding Privilage card',
    });
    return res.redirect(req.url);
  }
};
