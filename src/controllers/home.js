const ctrl = {}
const productInfo = require('../models/productInfo');


//show index home page
let brands = [];
let result = "";
ctrl.index = async (req, res) => {
    //==>trae las 6 imagenes por numero de vistas de mayor a menor
    var product_info = await productInfo.find().populate('image').sort({'views': -1}).limit(3).exec()
    //==>trae las 6 imagenes recientemente agregadas por fecha de mayor a menor
    var new_arrivals = await productInfo.find().populate('image').sort({'timestamp': -1}).limit(3).exec()
    //==> Busqueda de auto colocar todas las marcas 
    //Realizamos una consulta y traemos toda la info de los autos 
    var brand = await productInfo.find();
    let no_buplicated_brand = "";
    //recorremos el arreglo
    for(i of brand){
        //obtenemos la marca
        let single_brand = i.brand;
       //enviamos la marca al array
        brands.push(single_brand);
       //aplicamos un new set all array brands para asegurarnos de eliminar los elementos repetidos de un array
       //y enviamos a la variable vacia no_buplicated_brand
        no_buplicated_brand  = new Set(brands);
    }
    if(no_buplicated_brand ){
        //e la variable resul arme otra vez el array con los datos de no_buplicated_brand]
        result = [...no_buplicated_brand];        
    }

    res.render('index', {product_info: product_info, new_arrivals: new_arrivals, brands: result});
    brands = [];
    result = "";
}




//==> solo ajax para traer los modelos correspondientes a la marac seleccionada
ctrl.model = async(req, res) => {
    let single_model = [];
    let car_model = ""
    const brand = req.params.brand;
    var car_models = await productInfo.find({brand: new RegExp(brand)});
    for(i of car_models){
        single_model.push(i.model);
        no_duplicated_model = new Set(single_model);
    }
    if(no_duplicated_model){
        car_model = [...no_duplicated_model];
        res.send(car_model);
    }
    single_model = [];
    car_model = "";
}


//==> trae la cantidad de carros que hay con el mismo modelos

ctrl.model_quantity = async (req, res)=>{
    const model = req.params.quantity
    const model_quatity = await productInfo.find({'model': new RegExp(model)});
    const car_model_quantity = model_quatity.length;
    if(car_model_quantity){
        res.send({car_model_quantity});
    }
}

//===> Envia los datos del from de busqueda del home index osea la marca y el modelo

var allBrands = [];
ctrl.product_searching = async(req, res)=>{
    const {brand, model} = req.body;
    if(!brand){
        res.redirect('/');
    }

    if(brand && model){
        const search_by_brand_and_model = await productInfo.find({'brand': new RegExp(brand), 'model': new RegExp(model)}).populate('image');

        //traemos todas las marcas de autos
        const all_brands = await productInfo.find();
        for(i of all_brands){
            allBrands.push((i.brand));
        }
        let no_repeat_brand = new Set(allBrands);
        let result = [...no_repeat_brand];
        res.render('../views/searching_brand_model', {search_by_brand_and_model : search_by_brand_and_model,  all_brands: result});
    }

    if(!model){
        const search_by_brand = await productInfo.find({'brand': new RegExp(brand)}).populate('image');

        //traemos todas las marcas de autos
        const all_brands = await productInfo.find();
        for(i of all_brands){
            allBrands.push((i.brand));
        }

        let no_repeat_brand = new Set(allBrands);
        let result = [...no_repeat_brand];
        res.render('../views/searching_brand', {search_by_brand: search_by_brand, all_brands: result });

        allBrands=[];
        result = "";
    }
}

ctrl.about = async (req, res)=>{
    res.render('../views/about');
}


ctrl.howtobuy = async (req, res)=>{
    res.render('../views/under_construction');
}


ctrl.support = async (req, res)=>{
    res.render('../views/under_construction');
}


ctrl.terms = async (req, res)=>{
    res.render('../views/terms');
}


ctrl.privacy_politics = async(req, res)=>{
    res.render('../views/privacy_politics');
}




module.exports = ctrl;





