'use strict';

const
    express = require('express'),
    loginService = require('../services/loginService');

let router = express.Router();
/**
 * @swagger
 * /api/login/init
 * post :
 *  To intialise the login process 
 */
router.post('/init', loginService.initLogin);
router.post('/verify', loginService.loginStatus);
module.exports = router;