const admin_messages = require('../models/admin_messages');
const productInfo = require('../models/productInfo');
const user_messages = require('../models/user_messages');
const users = require('../models/users');
const ctrl = {}


//verificar si ya se inició sesion
ctrl.Islogged = async (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/logIn');
    }
}

//validar si el rol del usuarioq ue inicio sesion es superAdmin para mostrarle todos los mensajes de los usuarios

ctrl.validateSuperAdmin = async(req, res, next)=>{
    const role = req.user.role;
    if(role === "superAdmin"){
        //todos los mensajes que reciebe el admin
        const all_messages = await admin_messages.find();
        const all_products_id = [];
        let allproduct_info = "";

        if(all_messages){
            //buscando las imagenes de los autos del cliente es, esto era para mostar una imagend el producto que queria el usuario, pero en las vistas se me repetian las imagenes por eso no los puse pero es para saber como busvar por multiples ids (para estudiar)
            //Solo se debe enviar all_messages
            for(i of all_messages){
                all_products_id.push(i.product_id)
                allproduct_info = await productInfo.find({_id: { $in: all_products_id }}).populate('image');
            }

            res.render('../views/profile', {all_messages: all_messages, allproduct_info: allproduct_info});
            
        }
    }else{
        next();
    }
}

//si el rol no es super Admin, traer solo lo smensajes correspondientes a su id
ctrl.userMessages = async (req, res) =>{
    const user_id = req.user._id;
    var all_messages = await user_messages.find({'user_id': user_id});
    console.log("todos los mensajes", all_messages);
    if(all_messages){
        res.render('../views/userprofile', {all_messages: all_messages});
    }
}


//si el rol es super Admin mustrele todos los usuarios
ctrl.validateUserSuperAdmin = async(req, res, next)=> {
    const role = req.user.role;
    if(role === "superAdmin"){
        const all_users = await users.find();
        res.render('../views/all_users', {all_users: all_users});
    }else{
        next();
    }
}






ctrl.productById = async (req, res) =>{
    const product_id = req.params.product_id;
    const product = await productInfo.findById(product_id).populate('image');
    res.send(product);
}



//si el usuario tiene como rol superAdmon que traiga todos los mensajes ==> esto en un midleware
//pero si solo tiene como roll user que traiga todos los mensajes correspondondiestes a su id
// ctrl.showProfile =  async (req, res)=>{
//     const role = req.user.role;
//     console.log("este es el usuario que inicia sesión" ,req.user);
//     admin_messages.find().then((all_messages)=>{
//         console.log("estos son los mensajes", all_messages);
//     })
//     res.render('../views/profile')
// }

module.exports =  ctrl;