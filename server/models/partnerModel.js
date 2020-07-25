const  
    mongoose = require('mongoose'),
    { Schema } = mongoose;

var partnerSchema = new Schema({
    phone : String,
    address : [{
        addressLine1 : String,
        addressLine2 : String, 
        pincode : String, 
        city : String, 
        state : String
    }],
    isActive : Boolean,
    sessionId : String,
    otp:Number,
    orders : [{
        productId : String, 
        quantity : Number, 
        price : Number
    }],
    cart : [{
        productId : String,
        quantity : Number
    }]
})

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;