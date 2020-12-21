const admin_messages = require('../models/admin_messages');
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

ctrl.delete_message = async (req, res) => {
    const id = req.params.id;
    const deleted_message = await admin_messages.deleteMany({'_id': id});
    if(deleted_message){
        req.flash('message', 'El mensaje se ha eliminado')
        res.redirect('/profile');
    }
}

module.exports = ctrl;

