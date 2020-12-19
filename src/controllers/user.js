const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');

const ctrl = {}

ctrl.logIn = async(req, res)=>{
    res.render("./logIn");
}

ctrl.signUp = async (req, res) => {
    res.render("./signUp");
}



ctrl.sigUpData = async(req, res) => {
    const {name_lastname, email, phone_number, password} = req.body;
    const encripted_password =  bcrypt.hashSync(password, 10);

    const newUser  = new User({
        name_lastname: name_lastname.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        phone_number: phone_number.trim(),
        password: encripted_password
    })

    const newUserSaved = newUser.save();
    if(newUserSaved){
        res.redirect('/logIn');
    }
}

ctrl.logOut = async (req, res) => {
    req.logout();
    res.redirect('/');
}



module.exports = ctrl;
