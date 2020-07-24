'use strict'

const
    productModel = require('../models/productModel'),
    dao = require('../dao/searchDao');

async function getProductsByCategory(req,res){
res.json(await dao.getProductsByCategory);
}

module.exports = {
    getProductsByCategory : getProductsByCategory
}