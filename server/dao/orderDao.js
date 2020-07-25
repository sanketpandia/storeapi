'use strict'

const
    orderModel = require('../models/orderModel'),
    productModel = require('../models/productModel'),
    userModel = require('../models/userModel');
const { response } = require('express');

async function placeOrder(orderDetails){
    orderDetails.orderDateTime = new Date();
    let orderObject = new orderModel(orderDetails);
    orderObject.save().then((data) => {
        console.log(data);
    return true;
    }).catch((err) => {
        console.log(err);
        return false;
    })
}

async function updateProductQuantity(productId, quantity){
    let searchObject = {
        id : productId
    }
    productModel.findOneAndUpdate(searchObject, {$inc : {
        quantity : -(quantity)
    }}).then(() => {
        return true;
    }).catch(() =>{
        return false;
    })
}

async function updateUserOrders(userId, orderId){
    let searchObject = {
        phone : userId
    };
    userModel.findOneAndUpdate(searchObject, {$push : {
        orders : orderId
    }}).then(() => {
        return true;
    }).catch(() => {
        return false;
    })
}

async function getPreviousOrders(){
    let currentDate = new Date();
    let searchStartDate = new Date(currentDate.getDate()-3);
    currentDate.setHours(23,59,59);
    searchStartDate.setHours(0,0,0);
    let responseValue = await orderModel.find({
        orderDateTime : {
            $gte : searchStartDate,
            $lte : currentDate
        }
    }).sort({
        orderDateTime : 'desc'
    });
    return responseValue;
}
module.exports = {
    placeOrder : placeOrder,
    updateProductQuantity : updateProductQuantity,
    updateUserOrders : updateUserOrders,
    getPreviousOrders: getPreviousOrders
}