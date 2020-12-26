const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const productInfo = require('../models/productInfo');
const Image = require('../models/image');



const ctrl = {}

//==> guardar las imagenes en la bd
let images_ids = [];
let valid_extentions = [];


ctrl.uploadImage = async (req, res) => {
    async function save_img(){
        //console.log(req.body);
        for(i of req.files){
            const custome_name = uuidv4();
            //direccion de las imagenes de la carpeta temp con la imagen
            const imageTempPath = i.path;
            //obtenemos el la extencion de la imagen que estamos subiendo
            const ext = path.extname(i.originalname).toLowerCase();
            //debemos decirle a que carpeta vamos a subir la imagen final con extencion
            //path.resolve permite unir pedazos de url (no son directorios por eso no se usa join)
            const targetPath = path.resolve(`public/upload/${custome_name}${ext}`);
            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                valid_extentions.push(ext);
                fs.rename(imageTempPath, targetPath, (err) => {
                    if(err){
                        throw err;
                    }
                });
    
                //insertamos la imagen (el nombre de la imagen) en el modelo Imagen
                const newImageurl = custome_name + ext
                const newImage = new Image({
                    file_name: newImageurl
                });
                //images_ids = [];
                
                //las imagenes que estoy guardando estan en esta variable
                const imgs = await newImage.save();
                //de cada una de las imagenes quiero traer el id que me da mongoose
                if(imgs){
                    images_ids.push(imgs._id);
                }else{
                    console.log("internal error")
                }
            }else{
                fs.unlink(imageTempPath, function(err){
                    if(err){
                        throw err;
                    }
                });
                res.redirect('/newProduct');
            }
        } 
        //insertamos la info de la imagen en el modelo
        if(valid_extentions.length >= 1){
            const newImageInfo = new productInfo({
                brand: req.body.brand.toLowerCase().trim(),
                model: req.body.model.toLowerCase().trim(),
                color: req.body.color.toLowerCase().trim(),
                image: images_ids,
                mileaje: req.body.mileaje.trim(),
                price: req.body.price.trim(),
                transmision: req.body.transmision.toLowerCase().trim(),
                cylinder_capacity: req.body.cylinder_capacity.trim(),
                seats: req.body.seats.toLowerCase().trim(),
                gears: req.body.gears.trim(),
                plates: req.body.plates,
                fuelType: req.body.fuelType.toLowerCase().trim(),
                keys: req.body.keys.trim(),
                rims: req.body.rims.toLowerCase().trim(),
                max_vel: req.body.max_vel.trim(),
                gun: req.body.gun.trim(),
                tank: req.body.tank.trim(),
                hp: req.body.hp.trim(),
                description: req.body.description.trim(),
                isofix: req.body.isofix,
                abs: req.body.abs,
                fa: req.body.fa,
                tracControl: req.body.tracControl,
                emergencyBreak: req.body.emergencyBreak,
                airbags: req.body.airbags,
                deadAngle: req.body.deadAngle,
                fatigueDetector: req.body.fatigueDetector,
                foglights: req.body.foglights,
                airconditioning: req.body.airconditioning,
                bloototh: req.body.bloototh,
                parkingSensor: req.body.parkingSensor,
                tracControl: req.body.tracControl,
                radio: req.body.radio,
                leatherSeats: req.body.leatherSeats
            });
            newImageInfo.save();
            valid_extentions = [];
            images_ids = []
            res.redirect('/newProduct');
        }
        console.log("producto agregado correctamente");
    }
    save_img();

}

//==> mostrar pagian de subir imagenes
ctrl.product = (req, res) => {
    res.render('newProduct');
}


//==> Mostrar cada producto al hacer click en ver mas
ctrl.view_single_product = async(req, res) => {
    const id = req.params.id;
    //traiga la info del carro donde el id que viene de la vista sea igual al _id del producto de la bd
    let single_product = await productInfo.findOne({_id: id}).populate('image')
    console.log(single_product);
    //console.log(single_product);
    if(single_product){
        //sumele 1 al producto
        single_product.views = single_product.views + 1;
        single_product.save();
        res.render('../views/single_product', {single_product: single_product});
    }else{
        console.log("not found");
    }
}


ctrl.product_gallery = async(req, res) => {
    const id = req.params.id;
    //traiga la info del carro donde el id que viene de la vista sea igual al _id del producto de la bd
    let product_gallery = await productInfo.findOne({_id: id}).populate('image');
    if(product_gallery){
        res.render('gallery', {product_gallery: product_gallery});
    }
}

// let dd = {
//     nombre: 'new RegExp(brand, i)',
//     apellido: 'new RegExp(brand, i)',
// }


//===> Recibe los valores de los filtros

ctrl.filters = async (req, res) => {
    
    let query = {};

   const {brand, model}  = req.body;

    if(brand !== "undefined"){ // preguntamos si existe brands
        query['brand'] = new RegExp(brand, 'i');
    }

    if(model !== "undefined"){ // preguntamos si existe model
        query['model'] = new RegExp(model, 'i');
     }
    // // siempre que se trabaja con Promesas se debe usar
    // // un bloque try / catch
    try {
        let cars = await productInfo.find(query).populate('image');
        return res.send(cars);
    //    cars = await productInfo.find({'brand': new RegExp(brand, 'i'), 'model': new RegExp(model, 'i')});
    //    res.send(cars);
       
    }
    catch (e) {
      //console.log(e.message);
      return res.status(500).json({
        message: 'Ocurrió un error en la consulta'
      });
    }
  }


ctrl.fullproduct = async (req, res)=>{
    const brand = req.params.brand;
    const poduct = await productInfo.find({brand: new RegExp(brand)});
    if(poduct){
        res.send(poduct);
    }
}


ctrl.productsByModel = async (req, res)=>{
    const model = req.params.model;
    const productModel = await productInfo.find({model: new RegExp(model)});
    res.send(productModel);
}



module.exports = ctrl;