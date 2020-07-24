'use strict';

const
    express = require('express'),
    loginController = require('../../controllers/loginController'),
    searchController = require('../../controllers/searchController');

let router = express.Router();

router.use('/login', loginController);
router.use('/search', searchController)

module.exports = router;