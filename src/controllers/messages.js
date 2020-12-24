const admin_messages = require('../models/admin_messages');
const userMessages = require('../models/user_messages');
const ctrl = {}


//todos los mensajes van al admin insertando mensajes al modelo
ctrl.admin_messages =  async (req, res) => {
    //recibimos el id del auto de un form type hidden
    const {names, lastname, phone, userMessage, product_id, user_id} = req.body;
    const newAdminMessage = new admin_messages({
        names: names.trim(),
        lastname: lastname.trim(),
        phone: phone.trim(),
        product_id: product_id,
        user_id: user_id,
        userMessage: userMessage.trim()
    });

    newAdminMessage.save();
    req.flash('message', 'Su mensaje ha sido enviado');
    res.redirect(`/product/${product_id}`);
}


//Guardar mensajes que el admin le envia al usuario como respuesta viene del script

ctrl.user_messages = async (req, res)=>{
    const {product_id, car_brand, car_model, message, user_id, user_phone, user_names, user_lastname} = req.body
    const new_user_message = new userMessages({
        product_id: product_id,
        car_brand: car_brand,
        car_model: car_model,
        names: user_names,
        lastname: user_lastname,
        message: message,
        phone: user_phone,
        user_id: user_id
    });

    const save_new_user_message = new_user_message.save();
    if(save_new_user_message){
        req.flash('message', 'El mensaje ha sido enviado');
        res.redirect('/profile')
    }
 
}



ctrl.delete_message = async (req, res) => {
    const id = req.params.id;
    const deleted_message = await admin_messages.deleteMany({'_id': id});
    const deleted_userMessage = await userMessages .deleteOne({'_id': id});

    if(deleted_message){
        req.flash('message', 'El mensaje se ha eliminado')
        res.redirect('/profile');
    }

    if(deleted_userMessage){
        req.flash('message', 'El mensaje se ha eliminado')
        res.redirect('/profile');
    }
}

module.exports = ctrl;

