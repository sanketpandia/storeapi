'use strict';

const
    express = require('express'),
    orderService = require('../services/orderService');

let router = express.Router();
/**
 * @swagger
 * /api/login/init
 * post :
 *  To intialise the login process 
 */
router.post('/placeOrder', orderService.placeOrder);
router.get('/previousOrders', orderService.fetchPreviousOrders)
module.exports = router;