const express = require('express');
const router = express.Router();

const passportConfig = require('../config/passport');
const cashierController = require('../controllers/cashier');

// Cashier Routes
router.get(
  '/dashboard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.index
);
router.get(
  '/neworder',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  cashierController.neworder
);
router.get(
  '/vieworders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.viewOrders
);
router.get(
  '/listorder',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.viewOrders
);

router.get(
  '/editorder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editorder
);
router.post(
  '/submitorder',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.submitOrder
);
router.post(
  '/editorder/submitorder',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.updateOrder
);
router.post(
  '/updateorder',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.updateOrder
);
router.get(
  '/vieworder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.vieworder
);

router.get(
  '/cancelorder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.cancelOrder
);
router.post(
  '/cancelorder/submit',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.cancelSubmit
);

router.get(
  '/cancelorder/deletefull/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.deleteFull
);

router.get(
  '/add/billing',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.billing
);
router.get(
  '/generatebill/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.billing
);

router.get(
  '/add/user',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addUser
);
router.post(
  '/add/user',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addUser
);
router.get(
  '/add/category',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addCategory
);
router.post(
  '/add/category',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addCategory
);
router.get(
  '/add/items',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addItem
);
router.post(
  '/add/items',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addItem
);

// Read
router.get(
  '/listusers',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.listUser
);

router.get(
  '/listCategory',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.listCategory
);
//Edit users
router.get(
  '/edituser/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editUser
);

router.post(
  '/edituser/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editUser
);

router.get(
  '/editcategory/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editCategory
);
router.post(
  '/editcategory/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editCategory
);

router.get(
  '/edititem/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editFoodItem
);
router.post(
  '/edititem/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.editFoodItem
);

//Delete
router.get(
  '/deleteuser/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.deleteUser
);
router.get(
  '/deletecategory/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.deleteCategory
);
//list food

router.get(
  '/listfooditems',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.listFooditems
);

//Delete food items

router.get(
  '/deletefooditem/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.deleteFooditems
);
router.get(
  '/privilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.privilegecard
);
router.get(
  '/add/privilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addprivilegecard
);
router.get(
  '/view/privilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.viewprivilegecard
);

router.post(
  '/submit',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.submitPaymet
);
router.get(
  '/billprint/:id/:dis',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.billprint
);

//Dashbord Card
router.get(
  '/todaysorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.totalOrders
);
router.get(
  '/viewprint/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.oldBill
);

router.get(
  '/procesingorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.procesingOrders
);
router.get(
  '/cookingorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.cookingOrders
);
router.get(
  '/finishedorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.finishedOrders
);

router.get(
  '/oldorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.oldOrders
);
router.post(
  '/oldorders',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.oldOrders
);

router.get(
  '/addprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addPrivilegeCard
);
router.post(
  '/addprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.addPrivilegeCard
);

router.get(
  '/listprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.getPrivilegeList
);
router.get(
  '/deleteprivilege/:id',
  passportConfig.isAuthenticated,
  passportConfig.isCashier,
  cashierController.deletePrivilege
);
module.exports = router;
