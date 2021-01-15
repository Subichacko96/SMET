const express = require('express');
const router = express.Router();

const passportConfig = require('../config/passport');
const waiterController = require('../controllers/waiter');
const cashierController = require('../controllers/cashier');
const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');

// Waiter Routes
router.get(
  '/dashboard',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.index
);

router.get(
  '/neworder',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.neworder
);

router.get(
  '/listorder',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.listOrder
);

router.get(
  '/editorder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.editorder
);
router.post(
  '/submitorder',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.submitOrder
);
router.post(
  '/editorder/submitorder',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  cashierController.updateOrder
);
router.post(
  '/updateorder',
  passportConfig.isAuthenticated,
  waiterController.updateOrder
);
router.get(
  '/vieworder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.vieworder
);

router.get(
  '/cancelorder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.cancelOrder
);
router.post(
  '/cancelorder/submit',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.cancelSubmit
);

router.get(
  '/cancelorder/deletefull/:id',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.deleteFull
);
router.post(
  '/addprivilege',
  passportConfig.isAuthenticated,
  passportConfig.isWaiter,
  waiterController.addPrivilegeCard
);

module.exports = router;
