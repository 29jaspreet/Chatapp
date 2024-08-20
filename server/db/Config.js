const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Chat").then(()=>{
    console.log("Db connection is made succesfully")
}).catch((err)=>{
    console.log(err.message);
});