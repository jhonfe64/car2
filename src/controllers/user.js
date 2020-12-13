const User = require('../models/users');
const bcrypt = require('bcrypt');


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
        password: encripted_password.trim()
    })

    const newUserSaved = newUser.save();
    if(newUserSaved){
        res.redirect('/');
    }
}

// User.find().then((res)=>{
//     console.log(res);
// })



module.exports = ctrl;