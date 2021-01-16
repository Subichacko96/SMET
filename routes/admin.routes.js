const express = require('express');
const router = express.Router();

const passportConfig = require('../config/passport');
const adminController = require('../controllers/admin');
//const cashierController = require('../controllers/cashier');

// Add Create
router.get(
  '/dashboard',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.index
);
router.get(
  '/add/section',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addSection
);
router.post(
  '/add/section',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addSection
);
/*router.post(
  '/add/user',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addUser
);
router.get(
  '/add/category',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addCategory
);
router.post(
  '/add/category',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addCategory
);
router.get(
  '/add/items',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addItem
);
router.post(
  '/add/items',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.addItem
);

// Read
router.get(
  '/listusers',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.listUser
);

router.get(
  '/listCategory',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.listCategory
);
//Edit users
router.get(
  '/edituser/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editUser
);

router.post(
  '/edituser/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editUser
);

router.get(
  '/editcategory/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editCategory
);
router.post(
  '/editcategory/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editCategory
);

router.get(
  '/edititem/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editFoodItem
);
router.post(
  '/edititem/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.editFoodItem
);

//Delete
router.get(
  '/deleteuser/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.deleteUser
);
router.get(
  '/deletecategory/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.deleteCategory
);
//list food

router.get(
  '/listfooditems',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.listFooditems
);

//Delete food items

router.get(
  '/deletefooditem/:id',
  passportConfig.isAuthenticated,
  //passportConfig.isAdmin,
  adminController.deleteFooditems
);

router.get(
  '/changepassword',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.changePassword
);
router.post(
  '/changepassword',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.changePassword
);

// Dashboard Cards

router.get(
  '/todaysorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.totalOrders
);
router.get(
  '/viewprint/:id',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.billing
);
router.get(
  '/billprint/:id/:dis',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  cashierController.billprint
);
router.get(
  '/vieworder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.vieworder
);
router.get(
  '/procesingorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.procesingOrders
);
router.get(
  '/cookingorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.cookingOrders
);
router.get(
  '/finishedorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.finishedOrders
);
router.get(
  '/oldorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.oldOrders
);
router.post(
  '/oldorders',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.oldOrders
);
router.get(
  '/addprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.addPrivilegeCard
);
router.post(
  '/addprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.addPrivilegeCard
);

router.get(
  '/listprivilegecard',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.getPrivilegeList
);
router.get(
  '/deleteprivilege/:id',
  passportConfig.isAuthenticated,
  passportConfig.isAdmin,
  adminController.deletePrivilege
);*/
module.exports = router;
