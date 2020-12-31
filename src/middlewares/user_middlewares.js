const ctrl = {}
const Users = require('../models/users');
const bcrypt =  require('bcrypt');


//validar campos registro de usuarios
ctrl.validate_fields = (req, res, next) => {
    const {name_lastname, email, phone_number, password, first_password} = req.body;
    if(!name_lastname || !email || !phone_number || !password || !first_password){
        req.flash('message', 'Todos los campos son obligatorios');
        res.redirect('/signUp');
    }else{
        next();
    }
}

//vaidar campos inicio sesion

ctrl.validate_fields_logIn = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        req.flash('message', 'los campos son obligatorios');
        res.redirect('/logIn');
    }else{
        next();
    }
}

//validar si existe  ya un  usuario en la bd
//si es el primemr usaurio que se registra registrelo con roll admin

ctrl.validateNewUser = async (req, res, next) => {
    const usersQuantity = await Users.find();

    if(usersQuantity.length === 0){
        const {name_lastname, phone_number, email, password} = req.body;
        const encripted_password = bcrypt.hashSync(password, 10);
        const newUser = new Users({
            name_lastname: name_lastname.toLowerCase().trim(),
            phone_number: phone_number.trim(),
            password: encripted_password,
            email: email.toLowerCase().trim(),
            role: 'superAdmin'
        });

        const UserSaved = newUser.save();
        if(UserSaved){
            res.redirect('/');
        }
    }else{
        next();
    }
}

//validar si el email ya existe
ctrl.validateEmail = async (req, res, next)=>{
    const {email} = req.body;
    const all_users = await Users.findOne({'email': new RegExp(email)});
    if(all_users){
        req.flash('message', `el correo ${all_users.email} ya esta registrado`);
        res.redirect('/signUp')
    }else{
        next();
    }
}




module.exports = ctrl;
























