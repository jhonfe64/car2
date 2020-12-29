const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const newProduct = require('../controllers/newProduct');
const edit_products = require('../controllers/edit_products');
const user = require('../controllers/user');
const profile = require('../controllers/profile');
const user_middlewares = require('../middlewares/user_middlewares');
const messages = require('../controllers/messages');
const passport = require('passport');
const { stringify } = require('uuid');



module.exports = function(app){
    //==>shows index home page
    router.get('/', home.index);
    //==>show page to upload new product
    router.get('/newProduct', profile.Islogged, newProduct.product);
    //==>procesa la info del nuevo producto
    router.post('/create', profile.Islogged, newProduct.uploadImage);
    //==>muestra el producto al hacer click sobre el btn ver mas
    router.get('/product/:id', newProduct.view_single_product);
    //==>muestra la galería de cada producto
    router.get('/product/gallery/:id', newProduct.product_gallery);
    //==>muetra cada uno de los modelos al hacer click sobre seleccionar marca solo ajax => busqueda del index
    router.post('/model/:brand', home.model);
    //===> Trae la cantidad de autos correspondientes al modelo ajax => busqueda del index
    router.post('/model/quantity/:quantity', home.model_quantity);
    //===> /product/searching
    router.post('/product/searching', home.product_searching);

    /*=========================================================
    FILTROS
    =========================================================*/

    //===> filtros
    router.post('/product/filters', newProduct.filters);
    router.post('/product/fullproduct/:brand', newProduct.fullproduct);
    router.post('/product/productbymodel/:model', newProduct.productsByModel);

    // ===> Borrando los productos subidos
    router.get('/deleteProduct/:id', profile.Islogged, /*edit_produts.n,*/ edit_products.delete);
    // ===> Esta ruta me trae todos los carros para ser editados
    router.get('/getCars', profile.Islogged,  edit_products.allproducts);
    // ===> Ruta para traer el form de actaulizar producto y colocar info en el
    router.get('/updateProduct/:id', profile.Islogged, edit_products.updateProduct);
    // ===> Ruta que permite enviar los nuevos datos para actualizar el producto
    router.post('/updateProduct/:id', profile.Islogged, edit_products.saveEditProducts);

    //===> mostrando el form de registro
    router.get('/signUp', user.signUp);
    //===> Insertando info de registro
    router.post('/signUp', [user_middlewares.validate_fields, user_middlewares.validateNewUser, user_middlewares.validateEmail],  user.sigUpData);
    //===> mostrando el form de inicio de sesion
    router.get('/logIn', user.logIn);

    //===> ruta de autenticacion de usuarios inicio de sesión
    router.post('/logIn', user_middlewares.validate_fields_logIn,  passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/logIn",
        failureFlash: true
    }));

    //===> mostrando la vista de perfil (mensajes del usuario que inicia sesión)
    router.get('/profile', profile.Islogged, profile.validateSuperAdmin,  profile.userMessages);

    //===> Guardando los mensajes en el modelo de mensajes del super admin
    router.post('/messages',  profile.Islogged, messages.admin_messages);

    //===> Eliminando mesajes por id
    router.get('/deletemessage/:id', messages.delete_message);

    //===>admin respondiendo mensajes del formd e contacto
    router.post('/usermessage', messages.user_messages)

    //===> Trayendo la imagen del producto que el usuario envio por el form de contacto para mostrarla al admin a la hora de responder mensajes  profile.js
    router.post('/productById/:product_id', profile.productById);

    //===> cerrando sesion
    router.get('/user/logout', user.logOut);

    // trayendo todos los usuarios registrados
    router.get('/users', profile.Islogged, profile.validateUserSuperAdmin);

    //Eliminando usuaarios

    router.get('/deleteUser/:id', profile.Islogged, user.deleteUser);

    
    router.get('/about', home.about);

    router.get('/howtobuy', home.howtobuy);

    router.get('/support', home.support);

    router.get('/terms', home.terms);

    router.get('/privacy&politics', home.privacy_politics);







    router.get('/404', (req, res)=>{
        res.render('404');
    });

    router.use((req, res, next)=>{
        res.redirect('/404')
        next();
    });

    app.use(router);
}



