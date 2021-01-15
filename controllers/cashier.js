const db = require('../helpers/app/userHelper');

exports.index = async (req, res) => {
  let todaysOrder = await db.todaysOrders();
  todaysOrder = todaysOrder.data;

  let procesingOrder = await db.procesingOrders();
  procesingOrder = procesingOrder.data;

  let cookingOrder = await db.kitchenOrders();
  cookingOrder = cookingOrder.data;

  let closedOrder = await db.closedOrders();
  closedOrder = closedOrder.data;

  let cardCount = await db.listCard();
  cardCount = cardCount.cardCount;

  return res.render('./cashier/productpage', {
    title: 'Product details',
    user: 'Cashier',
    totalOrders: todaysOrder,
    procesingOrder: procesingOrder,
    cookingOrder: cookingOrder,
    closedOrder: closedOrder,
    cardCount: cardCount,
  });
};
exports.viewOrders = async (req, res) => {
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
      waiterName: e.waiter_name,
      items: subList,
    });
  });

  return res.render('./cashier/viewproduct', {
    title: 'Product details',
    user: 'Cashier',
    data: mainList,
  });
};

exports.billing = async (req, res) => {
  let orderData = await db.getOrders(req.params.id);
  let waiterName = orderData.data.waiter_name;

  let orderId = orderData.data._id;
  let customerName = orderData.data.customer_name;
  let phoneNo = orderData.data.customer_mobNo;
  let tableNo = orderData.data.table_no;
  let items = orderData.data.items;
  let total_bill = orderData.data.total_bill;
  let subList = [];
  let yy = new Date().getFullYear().toString().substr(-2);
  let mm = (new Date().getMonth() + 1).toString();
  let lastInvoiceNo = await db.getLastInvoiceNo();
  let lastMonth = (lastInvoiceNo.data.createdAt.getMonth() + 1).toString();
  let incInvoice;

  if (lastMonth === mm) {
    try {
      incInvoice = (lastInvoiceNo.data.lastDigit + 1).toString();
    } catch (error) {
      console.log(error);
      incInvoice = 10000;
    }
    // console.log(`----Same Month----`);
  } else {
    incInvoice = 1000;
    //console.log(`----New Month----`);
  }

  let newInvoiceNo = mm + yy + incInvoice;

  let CountData = await db.userCount(phoneNo);
  let userCount = 0;
  try {
    userCount = CountData.data.length;
  } catch (error) {
    console.log(error);
  }
  console.log(userCount);
  items.forEach((item) => {
    subList.push({
      itemName: item.item_name,
      order_type: item.order_type,
      item_price: item.item_price,
      item_total: Number(item.item_price) * Number(item.qty || item.parcelQty),
      qty: item.qty || item.parcelQty,
    });
  });

  return res.render('./cashier/billing', {
    title: 'Billing details',
    user: 'Cashier',
    customerName: customerName,
    phoneNo: phoneNo,
    tableNo: tableNo,
    orderid: orderId,
    items: subList,
    waiterName: waiterName,
    total_bill: total_bill,
    invoiceNo: newInvoiceNo,
    count: userCount,
  });
};

exports.viewproduct = (req, res) => {
  return res.render('./cashier/viewproduct', {
    title: 'Product details',
    user: 'Cashier',
  });
};

//TODO: privilegecard

exports.privilegecard = (req, res) => {
  return res.render('./cashier/privilegecardpage', {
    title: 'Previlegecard details',
    user: 'Cashier',
  });
};
exports.addprivilegecard = (req, res) => {
  return res.render('./cashier/addprivilegecard', {
    title: 'Previlegecard details',
    user: 'Cashier',
  });
};
exports.viewprivilegecard = (req, res) => {
  return res.render('./cashier/viewprivilegecard', {
    title: 'Previlegecard details',
    user: 'Cashier',
  });
};

exports.submitPaymet = async (req, res) => {
  let id = req.body.order;
  let data = await db.addInvoice(req.body, id);
  if (data != null) {
    return res.send({
      StatusCode: 200,
      success: true,
    });
  }
};

exports.billprint = async (req, res) => {
  let orderData = await db.getOrders(req.params.id);
  let waiterName = orderData.data.waiter_name;

  let orderId = orderData.data._id;
  let customerName = orderData.data.customer_name;
  let phoneNo = orderData.data.customer_mobNo;
  let tableNo = orderData.data.table_no;
  let items = orderData.data.items;
  let total_bill = orderData.data.total_bill;
  let subList = [];
  let yy = new Date().getFullYear().toString().substr(-2);
  let mm = (new Date().getMonth() + 1).toString();
  let lastInvoiceNo = await db.getLastInvoiceNo();
  let incInvoice;
  try {
    incInvoice = (lastInvoiceNo.data.lastDigit + 1).toString();
  } catch (error) {
    console.log(error);
    incInvoice = 10000;
  }

  let newInvoiceNo = mm + yy + incInvoice;

  items.forEach((item) => {
    subList.push({
      itemName: item.item_name,
      order_type: item.order_type,
      item_price: item.item_price,
      item_total: Number(item.item_price) * Number(item.qty || item.parcelQty),
      qty: item.qty || item.parcelQty,
    });
  });

  return res.render('./cashier/billprint', {
    title: 'Billing details',
    user: 'Cashier',
    customerName: customerName,
    phoneNo: phoneNo,
    tableNo: tableNo,
    orderid: orderId,
    items: subList,
    waiterName: waiterName,
    total_bill: total_bill,
    invoiceNo: newInvoiceNo,
    discount: req.params.dis,
  });
};

//from waiter

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

    return res.render('cashier/updateorder', {
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

    return res.render('cashier/neworder', {
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
    return res.render('cashier/vieworder', {
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
    return res.render('cashier/cancelorder', {
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
      return res.redirect('/cashier/listorder');
    }
    console.log(data);
  } catch (error) {}
};

exports.deleteFull = async (req, res) => {
  try {
    let deleteData = await db.deleteFullOrder(req.params.id);
    console.log(deleteData);
    if (deleteData.success) {
      return res.redirect('/cashier/listorder');
    }
    console.log(data);
  } catch (error) {}
};

// From Admin

// Add (Create)
exports.addUser = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const user = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
      };

      const userData = await db.addUser(user);
      if (userData) {
        req.flash('success', {
          msg: 'User added ',
        });
      } else {
        req.flash('error', {
          msg: 'Error occured while adding user account',
        });
      }
      if (req.user.role == 'admin') {
        res.redirect('/admin/listusers');
      } else {
        res.redirect('/cashier/listusers');
      }
    } else {
      return res.render('cashier/admin/addUser', {
        title: 'Add User',
        name: req.user.name,
      });
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    console.log(error);
    return res.redirect(req.url);
  }
};

exports.addCategory = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const addCategory = await db.addCategory(req.body);
      req.flash('success', {
        msg: 'Category added ',
      });
      res.render('cashier/admin/addCategory', {
        title: 'Add Category',
        name: req.user.name,
      });
    } else {
      return res.render('cashier/admin/addCategory', {
        title: 'Add Category',
        name: req.user.name,
      });
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    console.log(error);
    return res.redirect(req.url);
  }
};

exports.addItem = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const addItems = await db.addItem(req.body);

      if (addItems) {
        req.flash('success', {
          msg: 'Food item added ',
        });
      }
      if (req.user.role == 'admin') {
        res.redirect('/admin/add/items');
      } else {
        res.redirect('/cashier/add/items');
      }
    } else {
      let items = [];

      let data = await db.listCategory();
      data.data.forEach((element) => {
        items.push({
          name: element.name,

          id: element._id,
        });
      });
      return res.render('cashier/admin/addItem', {
        title: 'Add Food Items',
        data: items,
        name: req.user.name,
      });
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    console.log(error);
    return res.redirect(req.url);
  }
};

// Read
exports.listUser = async (req, res) => {
  try {
    const adminList = [];
    const cashierList = [];
    const waiterList = [];
    const kitchenList = [];
    const userList = await db.listUser();
    userList.data.forEach((element) => {
      if (element.role === 'admin') {
        adminList.push({
          name: element.name,
          email: element.email,
          id: element._id,
        });
      } else if (element.role === 'kitchen') {
        kitchenList.push({
          name: element.name,
          email: element.email,
          id: element._id,
        });
      } else if (element.role === 'cashier') {
        cashierList.push({
          name: element.name,
          email: element.email,
          id: element._id,
        });
      } else if (element.role === 'waiter') {
        waiterList.push({
          name: element.name,
          email: element.email,
          id: element._id,
        });
      }
    });

    return res.render('cashier/admin/listUser', {
      title: 'Users',
      name: req.user.name,
      adminData: adminList,
      cashierData: cashierList,
      waiterData: waiterList,
      kitchenData: kitchenList,
    });
  } catch (error) {}
};

exports.listCategory = async (req, res) => {
  try {
    let items = [];
    const catList = await db.listCategory();
    catList.data.forEach((element) => {
      items.push({
        name: element.name,

        id: element._id,
      });
    });
    return res.render('cashier/admin/listCategory', {
      title: 'Categories',
      name: req.user.name,
      data: items,
    });
  } catch (error) {}
};

// list food items
exports.listFooditems = async (req, res) => {
  try {
    let items = [];
    const foodList = await db.listFooditems();

    foodList.data.forEach((element) => {
      if (element.category[0] == null) {
        items.push({
          id: element._id,
          name: element.name,
          price: element.price,
          remarks: element.remarks,
        });
      } else {
        items.push({
          id: element._id,
          name: element.name,
          price: element.price,
          remarks: element.remarks,
          category: element.category[0].name,
        });
      }
    });

    return res.render('cashier/admin/listFooditems', {
      title: 'View Food Items',
      name: req.user.name,
      data: items,
    });
  } catch (error) {
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    console.log(error);
    return res.redirect(req.url);
  }
};
//Edit user

exports.editUser = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let data = req.body;

      let status = await db.editUser(req.params.id, data);
      if (status.success) {
        if (req.user.role === 'admin') {
          return res.redirect('/admin/listusers');
        } else {
          return res.redirect('/cashier/listusers');
        }
      }
    } else {
      let userData = await db.getUser(req.params.id);

      return res.render('cashier/admin/editUser', {
        title: 'Edit user',
        name: req.user.name,
        userId: userData._id,
        userName: userData.name,
        email: userData.email,
        userType: userData.role,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

exports.editCategory = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let data = req.body;

      let status = await db.editCategory(req.params.id, data);
      if (status.success) {
        if (req.user.role === 'admin') {
          return res.redirect('/admin/listCategory');
        } else {
          return res.redirect('/cashier/listCategory');
        }
      }
    } else {
      let catData = await db.getCategory(req.params.id);

      return res.render('cashier/admin/editCatrgory', {
        title: 'Edit user',
        name: req.user.name,
        catName: catData.data.name,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

exports.editFoodItem = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let data = req.body;

      let status = await db.editFoodItem(req.params.id, data);
      if (status.success) {
        if (req.user.role === 'admin') {
          return res.redirect('/admin/listfooditems');
        } else {
          return res.redirect('/cashier/listfooditems');
        }
      }
    } else {
      let catId = '';
      let catName = '';
      let foodData = await db.getFoodItem(req.params.id);
      let items = [];

      let data = await db.listCategory();
      data.data.forEach((element) => {
        items.push({
          name: element.name,
          id: element._id,
        });
      });
      if (foodData.data.category[0] != null) {
        catName = foodData.data.category[0].name;
        catId = foodData.data.category[0]._id;
      }

      return res.render('cashier/admin/editItem', {
        title: 'Edit user',
        name: req.user.name,
        foodName: foodData.data.name,
        catName: catName,
        catId: catId,
        price: foodData.data.price,
        remark: foodData.data.remarks,
        data: items,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

//Delete

exports.deleteUser = async (req, res) => {
  try {
    var status = await db.deleteUser(req.params.id);
    if (status) {
      req.flash('success', {
        msg: 'User removed successfully',
      });
      if (req.user.role === 'admin') {
        return res.redirect('/admin/listusers');
      } else {
        return res.redirect('/cashier/listusers');
      }
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    var status = await db.deleteCategory(req.params.id);
    if (status) {
      req.flash('success', {
        msg: 'Category removed successfully',
      });
      if (req.user.role === 'admin') {
        return res.redirect('/admin/listfooditems');
      } else {
        return res.redirect('/cashier/listCategory');
      }
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

exports.deleteFooditems = async (req, res) => {
  try {
    var status = await db.deleteFooditems(req.params.id);
    if (status) {
      req.flash('success', {
        msg: 'Food item removed successfully',
      });
      if (req.user.role === 'admin') {
        return res.redirect('/admin/listfooditems');
      } else {
        return res.redirect('/cashier/listfooditems');
      }
    }
  } catch (error) {
    console.log(error);
    req.flash('errors', {
      msg: 'oops some error occured',
    });
    return res.redirect(req.url);
  }
};

// Dashboard Card

exports.totalOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.todaysOrders();
      let orderList = data.tatalOrders;
      console.log(orderList);
      return res.render('cashier/admin/todaysorder', {
        title: 'Todays orders',
        user: 'Cashier',
        odres: orderList,
      });
    }
  } catch (error) {}

  console.log(req.user);
};

//Old Bill printing
exports.oldBill = async (req, res) => {
  let orderData = await db.getOrders(req.params.id);
  let waiterName = orderData.data.waiter_name;

  let orderId = orderData.data._id;
  let customerName = orderData.data.customer_name;
  let phoneNo = orderData.data.customer_mobNo;
  let tableNo = orderData.data.table_no;
  let items = orderData.data.items;
  let total_bill = orderData.data.total_bill;
  let subList = [];
  let yy = new Date().getFullYear().toString().substr(-2);
  let mm = (new Date().getMonth() + 1).toString();

  let invoiceData = await db.getInvoice(orderId);
  //console.log(invoiceData);

  let newInvoiceNo = invoiceData.data.invoiceNo;
  let remarks = invoiceData.data.remarks;
  let discount = invoiceData.data.discount;

  let CountData = await db.userCount(phoneNo);
  let userCount = 0;
  try {
    userCount = CountData.data.length;
  } catch (error) {
    console.log(error);
  }
  console.log(userCount);
  items.forEach((item) => {
    subList.push({
      itemName: item.item_name,
      order_type: item.order_type,
      item_price: item.item_price,
      item_total: Number(item.item_price) * Number(item.qty || item.parcelQty),
      qty: item.qty || item.parcelQty,
    });
  });

  return res.render('cashier/admin/oldBillprint', {
    title: 'Billing details',
    user: 'Cashier',
    customerName: customerName,
    phoneNo: phoneNo,
    tableNo: tableNo,
    orderid: orderId,
    items: subList,
    waiterName: waiterName,
    total_bill: total_bill,
    invoiceNo: newInvoiceNo,
    count: userCount,
    remarks: remarks,
    discount: discount,
  });
};

exports.procesingOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.procesingOrders();
      let orderList = data.procesingOrders;
      //console.log(orderList);
      return res.render('cashier/admin/processingorders', {
        title: 'Procesing orders',
        user: 'Cashier',
        odres: orderList,
      });
    }
  } catch (error) {}
};

exports.cookingOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.kitchenOrders();
      let orderList = data.kitchenOrders;
      //console.log(orderList);
      return res.render('cashier/admin/processingorders', {
        title: 'Procesing orders',
        user: 'Cashier',
        odres: orderList,
      });
    }
  } catch (error) {}
};

exports.finishedOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.closedOrders();
      let orderList = data.closedOrders;
      //console.log(orderList);
      return res.render('cashier/admin/processingorders', {
        title: 'Procesing orders',
        user: 'Cashier',
        odres: orderList,
      });
    }
  } catch (error) {}
};

// Previous Orders
exports.oldOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let date = req.body.date;
      date = Date.parse(date);
      let listOrders = await db.oldOrders(date);
      //console.log(listOrders);
      let orderList = listOrders.tatalOrders;
      console.log(orderList);
      return res.render('cashier/admin/todaysorder', {
        title: req.body.date + '-  Orders',
        user: 'Admin',
        odres: orderList,
        isExport: true,
        date: req.body.date,
      });
    } else {
      return res.render('cashier/admin/calender', {
        title: 'Old orders',
        user: 'Cashier',
      });
    }
  } catch (error) {}
};

// Previlege Cards
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

      return res.redirect('/cashier/addprivilegecard');
    } else {
      return res.render('cashier/admin/addPrivilege', {
        title: 'Add Privilege Card',
        user: 'Cashier',
      });
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'Error occured while adding Privilage card',
    });
    return res.redirect(req.url);
  }
};

exports.getPrivilegeList = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.listCard();

      return res.render('cashier/admin/PrivilegeList', {
        title: 'Privilege Users',
        user: 'Cashier',
        customers: data.data,
        isExport: true,
      });
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'Error occured while Checking Privilage card',
    });
    return res.redirect(req.url);
  }
};

exports.deletePrivilege = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let customerId = req.params.id;
      let data = await db.deleteCard(customerId);
      if (data.statusCode === 200) {
        req.flash('success', {
          msg: 'Customer Delete Successfully',
        });
      } else {
        req.flash('errors', {
          msg: 'Error occured while deleting Privilage card',
        });
      }
      return res.redirect('/cashier/listprivilegecard');
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'Error occured while Checking Privilage card',
    });
    return res.redirect(req.url);
  }
};
