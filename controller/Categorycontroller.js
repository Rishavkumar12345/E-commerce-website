const {Categorymodel } = require("../models/Categorymodel");
const slugify=require('slugify')


//create category controller
exports.createcategorycontroller=async(req,res)=>{
    try{
        
        const {name}=req.body;
        if(!name){
            res.status(401).send({message:"name is require"})
        }
        const existingcategory=await Categorymodel.findOne({"name":name})

        if(existingcategory){
            return res.status(200).send({
                success:false,
                message:"category already exist"
            })
        }

        const category=await new Categorymodel({name,slug:slugify(name)}).save();

        res.status(200).send({
            success:true,
            message:"new category created",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Category"
        })
    }
}


//update category controller
exports.updatecategorycontroller=async(req,res)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;

        const category=await Categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:"category updated successfully",
            category
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in updation"
        })
    }
}


//get all category controller
exports.getallcategory=async(req,res)=>{
    try{
        const category=await Categorymodel.find({});
        res.status(200).send({
            success:true,
            message:"Here is all product",
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting all category"
        })
    }
}

//single category controller
exports.singlecategory=async(req,res)=>{
    try{
        const {slug}=req.params;
        const category=await Categorymodel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"Get single category successfully",
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting category"
        })
    }
}

//Delete category controller
exports.deletecategory=async(req,res)=>{
    try{
        const {id}=req.params;
        await Categorymodel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category deleted successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting category"
        })
    }
}