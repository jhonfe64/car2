const mongoose = require('mongoose');
const express = require('express');
const {Schema} = express;


const user_messages_Schema = ({
    names: String,
    lastname: String,
    phone: Number,
    product_id: String,
    user_id: String,
    message: String,
    userMessage: String,
    timeStamp: {type: Date, default: Date.now}
});


module.exports = mongoose.model('userMessages', user_messages_Schema );