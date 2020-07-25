'use strict'
const  
    mongoose = require('mongoose'),
    { Schema } = mongoose;

var orderSchema = new Schema({
    id : String,
    userId : String,
    productId : String,
    quantity : Number,
    price : Number,
    orderDateTime : Date
})

const order = mongoose.model('order',orderSchema);
module.exports = order;