'use strict';

const
    express = require('express'),
    searchService = require('../services/searchService');

let router = express.Router();
/**
 * @swagger
 * /api/login/init
 * post :
 *  To intialise the login process 
 */
router.get('/category', searchService.getProductsByCategory)
module.exports = router;