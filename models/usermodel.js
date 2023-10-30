const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter your name first"],
        trim:true,
        minlen:[4,"name length must be greater than equal to 4"]
    },
    email:{
        type:String,
        require:[true,"Please enter your email first"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"Please enter your password"],
        minlen:[8,"Password should be greater than 8 character"],
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    },
    avatar:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
},{timestamps:true});

module.exports=mongoose.model('users',userschema);