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


//logenado usuarios
ctrl.sigUpData = async(req, res) => {
    const {name_lastname, email, phone_number, password, first_password} = req.body;

    if(password !== first_password){
        req.flash('message', 'Las contraseñas no coinciden');
        res.redirect('/signUp')
    }else{
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
}

//cerrando sesión

ctrl.logOut = async (req, res) => {
    req.logout();
    res.redirect('/');
}


//Eliminando usuarios

ctrl.deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const deleteuser = await User.deleteOne({'_id': id});
    if(deleteuser){
        req.flash('message', 'El usuario ha sido eliminado');
        res.redirect('/users');
    }
}



module.exports = ctrl;
