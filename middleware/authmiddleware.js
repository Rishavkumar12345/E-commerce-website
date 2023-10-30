const jwt=require('jsonwebtoken');
const usermodel = require('../models/usermodel');

exports.requiresignin=async(req,res,next)=>{
    try{
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
          );
        req.user=decode;
        next();
    }catch(error){
        console.log(error);
    }
}

//admin access
exports.isadmin=async(req,res,next)=>{
    try{

        // Ensure that req.user is defined before accessing req.user._id
        if (!req.user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access in finding user"
            });
        }

        const user=await usermodel.findById(req.user._id)
        if(user.role!=="admin"){
            return res.status(401).send({
                success:false,
                message:"unAuthorized  Access"
            })
        }else{
            next()
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"error in admin middleware"
        })
    }
}