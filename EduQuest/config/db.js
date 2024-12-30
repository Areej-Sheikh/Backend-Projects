const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('Database connection established!');
}).catch((error)=>{
    console.log(error.message);
}) 