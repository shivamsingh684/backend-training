const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance: {type:Number,defalut:100},
    address:String,
    emailId: String,
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] 
    },
    age: Number,
    isFreeAppUser:{type:Boolean,default:false}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) //users


