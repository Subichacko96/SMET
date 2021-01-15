const express = require('express');
const router = express.Router();

const passportConfig = require('../config/passport');
const kitchenController = require('../controllers/kitchen');

// Add Create
router.get(
  '/dashboard',
  passportConfig.isAuthenticated,
  passportConfig.isKitchen,
  kitchenController.index
);

router.get(
  '/orderstatus/:orderid/:itemid',
  passportConfig.isAuthenticated,
  passportConfig.isKitchen,
  kitchenController.statusToggle
);
router.get(
  '/orderready/:orderid',
  passportConfig.isAuthenticated,
  passportConfig.isKitchen,
  kitchenController.setReady
);
router.get(
  '/vieworder/:id',
  passportConfig.isAuthenticated,
  passportConfig.isKitchen,
  kitchenController.vieworder
);

module.exports = router;
