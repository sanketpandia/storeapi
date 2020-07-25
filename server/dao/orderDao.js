'use strict'

const
    orderModel = require('../models/orderModel');

async function placeOrder(orderDetails){
    orderDetails.orderDateTime = new Date();
    let orderObject = new orderModel(orderDetails);
    orderObject.save();
}

async function getNewOrders(){

}
module.exports = {
    placeOrder = placeOrder
}