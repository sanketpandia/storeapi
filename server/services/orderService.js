'use strict'

const
    dao = require('../dao/orderDao'),
    uuid = require('uuid-random');

async function placeOrder(req,res){
    let orderId = uuid();
   let orderObject = {
        id : orderId,
        productId : req.body.productId,
        userId : req.body.userId,
        quantity : req.body.quantity,
        price : req.body.price
    }

    let isUserDataUpdated = false, isOrderPlaced = false, isProductQuantityUpdated = false;

    await Promise.all([
        dao.placeOrder(orderObject),
        dao.updateProductQuantity(req.body.productId, req.body.quantity),
        dao.updateUserOrders(req.body.userId,orderId )
    ]).then((data) => {
        console.log(' Reached here at least. ' + data);
        isOrderPlaced = data[0];
        isUserDataUpdated = data[2];
        isProductQuantityUpdated = data[1];
           
    })
    .catch(err => {
        console.log(err);
        res.json({
            error : true,
            message : "Placing order failed"    
        });
    });
    if(isOrderPlaced && isProductQuantityUpdated && isUserDataUpdated){

        res.json({
            error : false,
            message : 'Order placing was successful'
        });
    }
    else{
           console.log(isUserDataUpdated, isProductQuantityUpdated, isOrderPlaced)
        res.json({
            error : true,
            message : "Placing order failed"
        });
    }
}

/**
 * 
 * Function to fetch the orders of the previous 3 days
 * 
 */
async function fetchPreviousOrders(req, res){
    res.json(await dao.getPreviousOrders())
}

module.exports = {
    placeOrder : placeOrder,
    fetchPreviousOrders, fetchPreviousOrders
}