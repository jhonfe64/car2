const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = Schema;



const ImageSchema = new Schema({
    file_name: String,
});


// ImageSchema.virtual('image_name_no_ext').get(function(){
//     const no_ext_name = file_name.split('.')[1];
//     return no_ext_name;
// });

module.exports = mongoose.model('Image', ImageSchema);
