const admin_messages = require('../models/admin_messages');
const ctrl = {}
//todos los mensajes van al admin
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

module.exports = ctrl;

