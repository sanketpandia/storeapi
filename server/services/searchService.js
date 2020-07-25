'use strict'

const
    //productModel = require('../models/productModel'),
    dao = require('../dao/searchDao');

async function getProductsByCategory(req,res){
    let responseObj = await dao.getProductsByCategory(req.params.category).catch(err => {
        res.json({
            error :  true,
            message : err
        })
    });
    res.json(responseObj); 
}

async function getProductByText(req,res){
    let responseObj = await dao.getProductByText(req.params.text).catch(err => {
        res.json({
            error :  true,
            message : err
        })
    });
    res.json(responseObj); 
}

async function addSomeObjects(req,res){
    dao.addSomeObjects();
    res.json({
        message : 'product added successfully'
    })
}

async function getUniqueCategories(req,res){
    dao.getUniqueCategories().then((data) => {
        res.json(data);
    }).catch(err => {
        res.json({
            error : true,
            message : err
        });
    })
}
module.exports = {  
    getProductsByCategory : getProductsByCategory,
    addSomeObjects: addSomeObjects,
    getProductByText : getProductByText,
    getUniqueCategories : getUniqueCategories
}