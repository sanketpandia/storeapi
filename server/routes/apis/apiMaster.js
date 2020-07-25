'use strict';

const
    express = require('express'),
    loginController = require('../../controllers/loginController'),
    searchController = require('../../controllers/searchController'),
    orderController = require('../../controllers/orderController'),
    partnerLoginController = require('../../controllers/partnerLoginController');

let router = express.Router();

router.use('/login', loginController);
router.use('/search', searchController);
router.use('/order', orderController);
router.use('/partnerLogin', partnerLoginController);
module.exports = router;