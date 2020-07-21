'use strict';

const
    express = require('express'),
    loginService = require('../services/loginService');

let router = express.Router();

router.post('/', loginService.initLogin);
router.get('/', loginService.loginStatusCheck);
module.exports = router;