const db = require('../helpers/app/userHelper');

// Dashboard
exports.index = (req, res) => {
  let name = req.user.name;
  return res.render('kitchen/home', {
    title: 'Dashboard',
    user: name,
  });
};

exports.getOrder = async () => {
  let mainList = [];
  const orderItems = await db.kitchenListOrders();
  orderItems.data.forEach((e) => {
    let subList = [];

    e.items.forEach((item) => {
      subList.push({
        itemId: item._id,
        itemName: item.item_name,
        status: item.item_status,
        order_type: item.order_type,
        qty: item.qty || item.parcelQty,
      });
    });

    mainList.push({
      orderId: e._id,
      table_no: e.table_no,
      name: e.customer_name,
      waiterName: e.waiter_name,
      items: subList,
    });
  });

  return mainList;
};

//toggle Status
exports.statusToggle = async (req, res) => {
  try {
    let orderId = req.params.orderid;
    let itemId = req.params.itemid;
    let statusData = await db.toggleStatus(orderId, itemId);
    //console.log(statusData);
    return res.redirect('/kitchen/dashboard');
  } catch (error) {}
};

//set ready Status

exports.setReady = async (req, res) => {
  try {
    let orderId = req.params.orderid;
    let updatedData = await db.readyStatus(orderId);
    if (updatedData.statusCode == 201) {
      req.flash('success', { msg: 'Items mooved to ready state' });
      return res.redirect('/kitchen/dashboard');
    } else {
      req.flash('errors', { msg: 'oops some error occured' });
      return res.redirect(req.url);
    }
  } catch (error) {
    req.flash('errors', { msg: 'oops some error occured' });
    return res.redirect(req.url);
  }
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
    return res.render('kitchen/vieworder', {
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
