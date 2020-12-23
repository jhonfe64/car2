const mongoose = require('mongoose');
const express = require('express');
const {Schema} = express;



const user_messages_Schema = ({
    product_img: String,
    car_brand: String,
    car_model: String,
    user_id: String,
    phone: Number,
    message: String, 
    names: String,
    lastname: String,
    from: {type: String, default: "CAR2 Admin"},
    timeStamp: {type: Date, default: Date.now}
});


module.exports = mongoose.model('userMessages', user_messages_Schema );