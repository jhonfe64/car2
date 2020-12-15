const ctrl = {}
//todos los mensajes van al admin
ctrl.admin_messages =  async (req, res) => {
    //recibimos el id del auto de un form type hidden
    const {user_id} = req.body;

    res.redirect(`/product/${user_id}`);
    res.send(req.body);
}

module.exports = ctrl;

