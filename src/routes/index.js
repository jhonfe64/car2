const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const newProduct = require('../controllers/newProduct');
const edit_products = require('../controllers/edit_products');


module.exports = function(app){
    //==>shows index home page
    router.get('/', home.index);
    //==>show page to upload new product
    router.get('/newProduct', newProduct.product);
    //==>procesa la info del nuevo producto
    router.post('/create', newProduct.uploadImage);
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



    //===> filtros
    // router.get('/product/searching/:brand/:model', newProduct.filters);
    router.get('/product/filters/:brand/:model', newProduct.filters);


  
    // ===> Borrando los productos subidos
    router.get('/deleteProduct/:id', /*edit_produts.n,*/ edit_products.delete);
    // ===> Esta ruta me trae todos los carros para ser editados 
    router.get('/getCars', edit_products.allproducts);
    // ===> Ruta para traer el form de actaulizar producto y colocar info en el
    router.get('/updateProduct/:id', edit_products.updateProduct);
    // ===> Ruta que permite enviar los nuevos datos para actualizar el producto
    router.post('/updateProduct/:id', edit_products.saveEditProducts);

    app.use(router);
}



