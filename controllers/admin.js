const db = require('../helpers/app/userHelper');

// Dashboard
exports.index = async (req, res) => { 
  return res.render('home', {
    title: 'Dashboard',
    user: 'Admin',
  });
};/*
exports.addSection= async (req, res) => { 
  return res.render('admin/addSection', {
    title: 'Dashboard',
    user: 'Admin',
  });
};*/

 //Add (Create)
/*exports.addSection = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const section = {
        section_name: req.body.name
      };

      const sectionData = await db.sectionUser();
      if (sectionData) {
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
      return res.render('admin/addUser', {
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
};*/

exports.addSection = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const category = {
        name: req.body.name
        
      };
      const catData = await db.addSection(category);
      if (catData) {
       console.log("cat added")
      } else {
        console.log('error in cat add')
      }
      res.redirect('admin/addsection');
    } else {
      return res.render('admin/addsection', {
        title: 'Add cat',
        //name: req.user.name,
      });
    }
  } catch (error) {
    //req.flash('errors', {
     // msg: 'oops some error occured'
    console.log(error);
    return res.redirect(req.url);
  }
};

/*exports.addItem = async (req, res) => {
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
      return res.render('admin/addItem', {
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

    return res.render('admin/listUser', {
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
    return res.render('admin/listCategory', {
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

    return res.render('admin/listFooditems', {
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

      return res.render('admin/editUser', {
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

      return res.render('admin/editCatrgory', {
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

      return res.render('admin/editItem', {
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

exports.changePassword = async (req, res) => {
  try {
    if (req.method === 'POST') {
      let id = req.body.userId;
      let password = req.body.password;
      let email = req.body.email;
      let name = req.body.name;
      let confirmPassword = req.body.confirmPassword;
      if (password != confirmPassword) {
        req.flash('errors', {
          msg: 'Passwors are not Match ',
        });
        if (req.user.role === 'admin') {
          return res.redirect('/admin/listfooditems');
        } else {
          return res.redirect('/cashier/listCategory');
        }
      }
      let status = await db.changePassword(id, name, email, password);
      if (status.success) {
        req.flash('success', {
          msg: 'Passwors Changed  ',
        });
        return res.redirect('/logout');
      }
    } else {
      return res.render('changepassword', {
        title: 'Change password',
        user: 'Admin',
        userId: req.user._id,
        userEmail: req.user.email,
        userName: req.user.name,
      });
    }
  } catch (error) {}

  console.log(req.user);
};

// Dashboard Card

exports.totalOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.todaysOrders();
      let orderList = data.tatalOrders;
      //console.log(orderList);
      return res.render('admin/todaysorder', {
        title: 'Todays orders',
        user: 'Admin',
        odres: orderList,
      });
    }
  } catch (error) {}

  console.log(req.user);
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
    return res.render('admin/vieworder', {
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

exports.procesingOrders = async (req, res) => {
  try {
    if (req.method === 'POST') {
    } else {
      let data = await db.procesingOrders();
      let orderList = data.procesingOrders;
      //console.log(orderList);
      return res.render('admin/processingorders', {
        title: 'Procesing orders',
        user: 'Admin',
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
      return res.render('admin/processingorders', {
        title: 'Procesing orders',
        user: 'Admin',
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
      return res.render('admin/processingorders', {
        title: 'Procesing orders',
        user: 'Admin',
        odres: orderList,
      });
    }
  } catch (error) {}
};

//Old Bill printing
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

  return res.render('admin/billing', {
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
      return res.render('admin/todaysorder', {
        title: req.body.date + '-  Orders',
        user: 'Admin',
        odres: orderList,
        isExport: true,
        date: req.body.date,
      });
    } else {
      return res.render('admin/calender', {
        title: 'Old orders',
        user: 'Admin',
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

      return res.redirect('/admin/addprivilegecard');
    } else {
      return res.render('admin/addPrivilege', {
        title: 'Add Privilege Card',
        user: 'Admin',
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

      return res.render('admin/PrivilegeList', {
        title: 'Privilege Users',
        user: 'Admin',
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
      return res.redirect('/admin/listprivilegecard');
    }
  } catch (error) {
    req.flash('errors', {
      msg: 'Error occured while Checking Privilage card',
    });
    return res.redirect(req.url);
  }
};
*/