const mongoose = require('mongoose');
const {Schema} = mongoose;

const userschema = ({
    name_lastname: String,
    email: String,
    phone_number: Number,
    password: String,
    role: {type: String, default: 'user'}
});

module.exports =  mongoose.model('User', userschema);
