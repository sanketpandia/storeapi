const  
    mongoose = require('mongoose'),
    { Schema } = mongoose;

var productSchema = new Schema({
    id : String,
    name : String,
    quantity : Number,
    price : Number,
    category : String,
    imageLink : String,
    discount : Number
})
const product = mongoose.model('Product', productSchema);
module.exports = product;