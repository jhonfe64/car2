const {database} = require('./key');
const mongoose = require('mongoose');

mongoose.connect(database.URI, { useNewUrlParser: true,  useUnifiedTopology: true }).then(()=>{
    console.log("conencted to the data base");
}).catch((err)=>{
    console.log(err);
})


