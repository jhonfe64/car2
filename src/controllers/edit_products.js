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

   //En la variable item = incuentre donde el auto coincida con el id
   const item = await productInfo.findById(id);

   let images_to_delete = [];

   const find = await Image.find({ _id: { $in: item.image }});
    for(images of find){
        images_to_delete.push(images.file_name);
    }

    //par eliminar las imagenes de la carpeta
    for(i=0; i<images_to_delete.length; i++){
        fs.unlink(path.join(__dirname, `../public/upload/${images_to_delete[i]}`), function(err){
            if(err){
                throw err;
            }
        });
    }
    //A el auto que se sselecciono por id guardado en la variable itemp, busquele la propiedad .image(que son todas laas imagenes de ese carro, las ids);s
    item_images = item.image;
    //ahora del Modelo Image borre todas las imagenes donde los ids correspondan a los ids de la propiedad item.image
    //encuentreme donde el id o los _ids del modelo Image coincidan con los ids que guarda item en a propiedad image
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
    //id del auto
    const id = req.params.id;
    //ids de las imagenes que se van a eliminar
    const {picture_id} = req.body;
    //imagenes nuevas a subir
    console.log(req.files);

    //de esas ids debemos traer el nombre de las imagenes para despues borrarlas en la carpeta
    var find_images_names = await Image.find({_id: { $in: picture_id}});
    //Eliminamos las imagenes de la carpeta
    for(i=0; i<find_images_names.length; i++){
            fs.unlink(path.join(__dirname, `../public/upload/${find_images_names[i].file_name}`), function(err){
            if(err){
                throw err;
            }
        });
    }
    //borrando las imagenes relacionadas del modelo Image
    var deleted_pictures = await Image.deleteMany({_id: { $in: picture_id}});


    await productInfo.findOneAndUpdate({_id: id}, {
        brand: req.body.brand.trim(),
        model: req.body.model.trim(),
        color: req.body.color.trim(),
        fuelType: req.body.fuelType.trim(),
        doors: req.body.doors.trim(),
        transmision: req.body.transmision.trim(),
        mileaje: req.body.mileaje.trim(),
        cylinder_capacity: req.body.cylinder_capacity.trim(),
        seats: req.body.seats.trim(),
        gears: req.body.gears.trim(),
        plates: req.body.plates.trim(),
        keys: req.body.keys.trim(),
        rims: req.body.rims.trim(),
        max_vel: req.body.max_vel.trim(),
        gun: req.body.gun.trim(),
        tank: req.body.tank.trim(),
        hp: req.body.hp.trim(),
        description: req.body.description.trim(),
        price: req.body.price.trim(),
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
        radio: req.body.radio,
        leatherSeats: req.body.leatherSeats
   }, {useFindAndModify: false});


    // var r = await productInfo.findById(id);
    // for(i=0; i<r.length; i++){

    // }
    // console.log(typeof r);
    

    // elimine de productInfo 
    //var x = await productInfo.deleteOne({'image': picture_id });
    // const deletedImages = await Image.deleteMany({ _id: { $in: item.image } });

    //Borre las imagenes que eliminó el usuario

    res.redirect('/getCars');
}



module.exports = ctrl;