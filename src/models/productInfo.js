const mongoose = require('mongoose');
//const { schema } = require('./image');
const {Schema} = mongoose;


const productInfoSchema = new Schema({
    brand: String,
    model: String,
    color: String,
    views: {type: Number, default: 0},
    fuelType: String,
    doors: Number,
    transmision: String,
    mileaje: Number,
    price: Number,
    description: String,
    cylinder_capacity: Number,
    seats: Number,
    gears: Number,
    plates: String,
    keys: Number,
    rims: String,
    max_vel: Number,
    gun: Number,
    tank: Number,
    hp: Number,
    isofix: String,
    abs: String,
    fa: String,
    tracControl: String,
    emergencyBreak: String,
    airbags: String,
    deadAngle: String,
    fatigueDetector: String,
    foglights: String,
    airconditioning: String,
    bloototh: String,
    parkingSensor: String,
    radio: String,
    leatherSeats: String,
    timestamp: {type: Date, default: Date.now},
    image: [{type: Schema.Types.ObjectId, ref: 'Image'}]
    //seller: { type: Schema.Types.ObjectId, ref: 'Seller'}
});

module.exports = mongoose.model('productInfo', productInfoSchema);
