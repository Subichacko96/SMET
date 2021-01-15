const User = require('../../models/User');
const Category = require('../../models/categories');
const Items = require('../../models/items');
const Invoice = require('../../models/invoice');

const Customers = require('../../models/customers');

const Orders = require('../../models/orders');

exports.generateAdminUser = async function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      await User.create(user);
      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

//Add (Create) ..

exports.addUser = async function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      await User.create(user);
      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.addCategory = async function (category) {
  return new Promise(async (resolve, reject) => {
    try {
      await Category.create(category);
      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.addItem = async function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Items.create(item);
      let newData = await Category.findOneAndUpdate(
        { _id: data.category },
        { $push: { items: data._id } }
      );

      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.addOrder = async function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Orders.create(item);

      return resolve({
        statusCode: 200,
        message: 'Added Successfully',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.updateOrder = async function (
  orderId,
  cName,
  pno,
  tno,
  item,
  newTotel
) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Orders.findByIdAndUpdate(orderId, {
        customer_name: cName,
        customer_mobNo: pno,
        table_no: tno,
        $inc: { total_bill: newTotel },
        $push: { items: item },
      });

      return resolve({
        statusCode: 200,
        message: 'Added Successfully',
        data: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.toggleStatus = async function (orderId, itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Orders.findOne({ _id: orderId, 'items._id': itemId });
      data.cooking_status = 'Cooking';
      data.items.forEach((item) => {
        if (item._id == itemId) {
          if (item.item_status == 'Processing') {
            item.item_status = 'Cooking';
          } else if (item.item_status == 'Cooking') {
            item.item_status = 'Ready';
          }
        }
        data.save();
      });
      return resolve({
        statusCode: 201,
        message: 'Updated Successfully',
        data: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.readyStatus = async function (orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Orders.findByIdAndUpdate(orderId, {
        cooking_status: 'Ready',
      });

      return resolve({
        statusCode: 201,
        message: 'Updated Successfully',
        data: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

//Read
exports.getUser = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ _id: id });
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};
exports.listUser = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.find();
      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
        data: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.listCategory = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Category.find();
      console.log(data.items);
      return resolve({
        data: data,
        statusCode: 201,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};
// list food items

exports.listFooditems = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Items.find()
        .populate('category')
        .sort({ category: 1 })
        .exec();
      return resolve({
        data: data,
        statusCode: 201,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.listOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Orders.find({
        order_status: 'running',
        items: { $ne: null },
      })
        .sort({ updatedAt: -1 })
        .exec();

      return resolve({
        data: data,
        statusCode: 201,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

//For Kitchen
exports.kitchenListOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Orders.find({
        order_status: 'running',
        cooking_status: { $ne: 'Ready' },
        items: { $ne: null },
      })
        .sort({ updatedAt: -1 })
        .exec();

      return resolve({
        data: data,
        statusCode: 201,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

//edit user
exports.editUser = async function (id, data) {
  console.log(id, data);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      user.name = data.name;
      user.email = data.email;
      user.role = data.role;
      if (data.password != '') {
        user.password = data.password;
      }
      user.save();
      return resolve({
        data: user,
        statusCode: 201,
        message: 'Updated',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.editCategory = async function (id, data) {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      const cat = await Category.findByIdAndUpdate(id, data);

      return resolve({
        data: cat,
        statusCode: 201,
        message: 'Updated',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.editFoodItem = async function (id, data) {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      const cat = await Items.findByIdAndUpdate(id, data);

      return resolve({
        data: cat,
        statusCode: 201,
        message: 'Updated',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};
exports.getOrders = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Orders.findById(id);

      return resolve({
        data: data,
        statusCode: 200,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.getCategory = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Category.findById(id);

      return resolve({
        data: data,
        statusCode: 200,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.getFoodItem = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Items.findById(id).populate('category');

      return resolve({
        data: data,
        statusCode: 200,
        message: 'Finded',
      });
    } catch (error) {
      return reject(error);
    }
  });
};
// Delete

exports.deleteUser = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.deleteOne({
        _id: data,
      });
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};

exports.deleteCategory = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Category.deleteOne({
        _id: data,
      });
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};

exports.deleteFooditems = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Items.deleteOne({
        _id: data,
      });
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};
exports.deleteFullOrder = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Orders.deleteOne({
        _id: data,
      });
      return resolve({
        data: user,
        statusCode: 200,
        message: 'Finded',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.deleteOrder = async function (orderId, itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Orders.findByIdAndUpdate(orderId, {
        $pull: { items: { _id: itemId } },
      });
      return resolve({
        data: data,
        statusCode: 200,
        message: 'Finded',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.deleteItem = async function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Items.deleteOne({
        _id: data,
      });
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};

// for listing Food Items by category

exports.itemsByCategory = async (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await Items.find({ category: category });
      //console.log(items);
      return resolve(items);
    } catch (error) {
      return reject(error);
    }
  });
};

exports.changePassword = async function (id, name, email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      user.email = email;
      user.name = name;
      if (password != '') {
        user.password = password;
      }
      user.save();
      return resolve({
        data: user,
        statusCode: 201,
        message: 'Updated',
        success: true,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.addInvoice = async function (item, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let update = await Orders.findByIdAndUpdate(id, {
        order_status: 'closed',
      });
      let data = await Invoice.create(item);
      return resolve({
        statusCode: 201,
        message: 'Added Successfully',
        data: data,
        update: update,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.getLastInvoiceNo = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let predata = await Invoice.find().sort({ createdAt: -1 }).exec();

      let data = predata[0];
      return resolve({
        data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.userCount = async function (mob) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Invoice.find({ customerMob: mob });

      return resolve({
        data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.todaysOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      let data = await Invoice.find({
        createdAt: { $gte: start, $lt: end },
      }).lean();

      let todaysorder = 0;
      if (data.length > 0) {
        todaysorder = data.length;
      }
      return resolve({
        statusCode: 200,
        data: todaysorder,
        tatalOrders: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.procesingOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      let data = await Orders.find({
        cooking_status: 'Processing',
        createdAt: { $gte: start, $lt: end },
      }).lean();
      let orderCount = 0;
      if (data.length > 0) {
        orderCount = data.length;
      }

      return resolve({
        statusCode: 200,
        data: orderCount,
        procesingOrders: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.kitchenOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      let data = await Orders.find({
        cooking_status: 'Cooking',
        createdAt: { $gte: start, $lt: end },
      }).lean();
      let orderCount = 0;
      if (data.length > 0) {
        orderCount = data.length;
      }

      return resolve({
        statusCode: 200,
        data: orderCount,
        kitchenOrders: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.closedOrders = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);

      let data = await Orders.find({
        cooking_status: 'Ready',
        createdAt: { $gte: start, $lt: end },
      }).lean();
      let orderCount = 0;
      if (data.length > 0) {
        orderCount = data.length;
      }

      return resolve({
        statusCode: 200,
        data: orderCount,
        closedOrders: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.getInvoice = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Invoice.findOne({ order: id });
      //console.log(data);
      return resolve({
        statusCode: 200,
        data: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

exports.oldOrders = async function (date) {
  return new Promise(async (resolve, reject) => {
    try {
      let start = new Date(date);
      start.setHours(0, 0, 0, 0);
      let end = new Date(date);
      end.setHours(23, 59, 59, 999);

      let data = await Invoice.find({
        createdAt: { $gte: start, $lt: end },
      }).lean();

      let todaysorder = 0;
      if (data.length > 0) {
        todaysorder = data.length;
      }
      return resolve({
        statusCode: 200,
        data: todaysorder,
        tatalOrders: data,
      });
    } catch (error) {
      return reject(error);
    }
  });
};

//Privilage Card

exports.addCard = async function (card) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Customers.create(card);
      return resolve({
        statusCode: 200,
        message: 'Added Successfully',
        data: data,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        return resolve({
          statusCode: 409,
          message: 'Customer Allready exist',
        });
      } else {
        return reject(error);
      }
    }
  });
};

exports.listCard = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Customers.find().sort({ updatedAt: -1 }).lean().exec();
      let cardCount = 0;
      if (data.length > 0) {
        cardCount = data.length;
      }
      return resolve({
        statusCode: 200,
        message: 'Added Successfully',
        data: data,
        cardCount: cardCount,
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

exports.deleteCard = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Customers.findByIdAndDelete(id);
      console.log(data);
      return resolve({
        statusCode: 200,
        message: 'Removed Successfully',
        data: data,
      });
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};
