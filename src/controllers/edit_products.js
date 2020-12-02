const productInfo = require('../models/productInfo');
const Image = require('../models/image');
//llamando el schema
const productInfoSchema = require('mongoose').model('productInfo').schema;
//para eliminar las imagenes de la carpeta
const fs = require('fs');
const path = require('path');


const ctrl = {};


ctrl.allproducts = async(req, res)=>{
    let all_cars = await productInfo.find().populate('image').sort();
    // console.log(all_cars);
    res.render('all_products', {all_cars: all_cars});
}
    
ctrl.delete = async (req, res) => {    
    const id = req.params.id;

    //par eliminar las imagenes de la carpeta
   //encuentreme donde el id o los _ids del modelo Image coincidan con los ids que guarda item en a propiedad image
   const item = await productInfo.findById(id);

   let images_to_delete = [];
   const find = await Image.find({ _id: { $in: item.image }});
    for(images of find){
        images_to_delete.push(images.file_name);
    }

    for(i=0; i<images_to_delete.length; i++){
        fs.unlink(path.join(__dirname, `../public/upload/${images_to_delete[i]}`), function(err){
            if(err){
                throw err;
            }
        });
    }

    //Encuentre el elemento con el auto con el id indicado
    item_images = item.image;
    //ahora del Modelo Image borre todas las imagenes donde los ids correspondan a los ids de la propiedad item.image
    const deletedImages = await Image.deleteMany({ _id: { $in: item.image } });
    //Ahora borre el carro del modelo productInfo
    let delete_car = await productInfo.deleteOne({_id: id});
    if(deletedImages && delete_car){
        res.redirect('/getCars');
    }
}


ctrl.updateProduct = async(req, res)=>{
    const id = req.params.id;
    let car_to_edit = await (productInfo.findOne({_id: id})).populate('image');
    if(car_to_edit){
        //enviammos la info al formulrio
        res.render('update_products', {car_to_edit: car_to_edit});
    }
}


ctrl.saveEditProducts = async(req, res)=>{
    console.log(req.body);
    res.redirect('/getCars');
}



module.exports = ctrl;