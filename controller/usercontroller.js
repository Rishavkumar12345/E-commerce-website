const {hashpassword,comparepassword}  = require("../helper/userhelper")
const usermodel = require("../models/usermodel")
const jwt =require('jsonwebtoken');


exports.registercontroller=async(req,res)=>{
    try{
        const{name,email,password,phone,address,answer}=req.body

        //validation
        if(!name){
            return res.send({message:"Name is require"})
        }

        if(!email){
            return res.send({message:"Email is require"})
        }

        if(!password){
            return res.send({message:"Password is require"})
        }

        if(!phone){
            return res.send({message:"Phone number is require"})
        }

        if(!address){
            return res.send({error:"Address is require"})
        }

        if(!answer){
            return res.send({error:"Answer is require"})
        }

        //check user
        const existinguser =await usermodel.findOne({email})
        
        //existing user
        if(existinguser){
            return res.status(200).send({
                success:false,
                mesaage:"Already Register, Please login",
            })
        }

        //register user
        const hashedpassword=await hashpassword(password)
        //save user

        const user= await new usermodel({name,email,phone,address,password:hashedpassword,answer}).save();

        res.status(201).send({
            success:true,
            mesaage:"user register successfully",
            user
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            mesaage:"Error in registeration",
            error
        })
    }
};

//POST LOGIN
exports.logincontroller=async(req,res)=>{

    try{
        const {email,password}=req.body;

        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"All fields are mandetory",
            });
        }

        //check user
        const user=await usermodel.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not registered",
            });
        }

        //match the password
        const match = await comparepassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "7d",});
        res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
        },
        token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login"
        })
    }
};

//forgot password
exports.forgotpasswodcontroller=async(req,res)=>{

    try{
        const {email,answer,newpassword}=req.body;

        if(!email){
            res.status(401).send({message:"Email is require"});
        }
        if(!answer){
            res.status(401).send({message:"Answer is require"});
        }
        if(!newpassword){
            res.status(401).send({message:"New Password is require"});
        }

        const user=usermodel.findOne({email,answer});

        if(!user){
            res.send(401).send({mesaage:"Email or answer is wrong"})
        }

        const hased=await hashpassword(newpassword);
        await usermodel.findByIdAndUpdate(user._id,{password:hased});

        res.status(200).send({
            success:true,
            message:"Password Reset Succesfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong ",
            error
        })
    }

}

//Protected controller
exports.testcontroller=(req,res)=>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
}

