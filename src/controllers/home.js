const ctrl = {}
const productInfo = require('../models/productInfo');


//show index home page
let brands = [];
let result = "";
ctrl.index = async (req, res) => {
    //==>trae las 6 imagenes por numero de vistas de mayor a menor
    var product_info = await productInfo.find().populate('image').sort({'views': -1}).limit(6).exec()
    //==>trae las 6 imagenes recientemente agregadas por fecha de mayor a menor
    var new_arrivals = await productInfo.find().populate('image').sort({'timestamp': -1}).limit(6).exec()
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
    console.log(brands)
    brands = [];

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
    }
    res.send(car_model);
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

        // var numers2 = [1800, 1750];


        // for(i=0; i<numers2; i++){
        //     var x = numers2[i] % 500;

        
        //     if(numers2[i] % 500 != 0){

        //     }
        // }

        // //AGARRE TODOS LOS NUMEROS, ENCUENTRE EL NUMERO MAX Y EL MINIMO
        // //DESPUES Y SUMELE DE A 500 DESDE EL NUMERO MENOR HASTA QUE LLEGUE AL MAXIMO



        // var prices = [1580, 7894, 4798, 8795, 8795, 25487];

        // var rounded_max_min_prices = [];

        // var max_price = Math.max(...prices);
        // var min_price = Math.min(...prices);

        // var max_min_prices = [max_price, min_price];


        // for(i=0; i<max_min_prices.length; i++){
        //     if(max_min_prices[i] % 500 == 0){
        //     }else{
        //         var dd = Math.round(max_min_prices[i]/500)*500;
        //         rounded_max_min_prices.push(dd);
        //     }
        // }

        // console.log(rounded_max_min_prices);
        // const ee = (rounded_max_min_prices[0] - rounded_max_min_prices[1]) / 500;
        // var lowest_price = rounded_max_min_prices[1]
        

        // for(i=0; i<ee; i++){
        //     lowest_price = lowest_price + 500;
        //     console.log(lowest_price);
        // }

   
    
    



        
     

        

        //obtener los numero smultiplos de 500
        // var numbers = [1000, 2000, 3000, 3500, 1850, 5, 3850];
        // var f = []
        // for(i=0; i<numbers.length; i++){
        //     if(numbers[i] % 500 == 0){
        //         f.push(numbers[i])
        //     }else{
        //         var T = Math.ceil(numbers[i]/500)*500;
        //         console.log(T);
        //     }
        // }
        //console.log(f);
    }    
    
    //consultamos el modelo para traer todas las marcas de autos 
}


// ctrl.filters = async(req, res)=>{
//     console.log(req.body);
// }



module.exports = ctrl;