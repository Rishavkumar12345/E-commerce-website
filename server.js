const express=require("express");
const dotenv=require("dotenv");
const connectDatabse=require("./congif/database");
const morgon=require("morgan");
const userrouter=require("./router/userrouter")
const categoryroute=require('./router/Categoryroute')
const productroute=require('./router/productroute')
const cors=require('cors')

//rest object
const app=express();

//configure env
dotenv.config();

//connect to database
connectDatabse();

//middleware
app.use(cors());
app.use(express.json())
app.use(morgon('dev'))

//routing
app.use('/api/v1/user',userrouter);
app.use('/api/v1/category',categoryroute)
app.use('/api/v1/product',productroute)


//rest api
app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to commerce Website"
    })
});

//PORT
const PORT=process.env.PORT || 8080;

//create server
app.listen(PORT,()=>{
    console.log(`Server is in ${process.env.DEV_MODE} running on ${PORT}`)
});