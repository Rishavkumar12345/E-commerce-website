const mongoose=require("mongoose");

const connectDatabse=()=>{
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/E-commerce',{useNewUrlParser:true,useUnifiedTopology: true}).then((data)=>{
        console.log('Mongodb connected successfully');
    })
    }catch(error){
        console.log("database connection error");
    }
}

module.exports=connectDatabse;