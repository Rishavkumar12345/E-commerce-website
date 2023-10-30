const {productmodel} =require('../models/productmodel')
const {Categorymodel}=require('../models/Categorymodel')
const fs=require('fs');
const { default: slugify } = require('slugify');
const slug=require('slugify')

exports.productcontroller=async(req,res)=>{
    try{
        const { name, description, price, category, quantity, shipping } =
        req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
        case !name:
            return res.status(500).send({ error: "Name is Required" });
        case !description:
            return res.status(500).send({ error: "Description is Required" });
        case !price:
            return res.status(500).send({ error: "Price is Required" });
        case !category:
            return res.status(500).send({ error: "Category is Required" });
        case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
            return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productmodel({ ...req.fields, slug:slugify(name) });
        if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating product",
        });
    }
}

//get all product
exports.getproductcontroller=async(req,res)=>{
    try{
        const product=await productmodel.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            count:product.length,
            message:"All Product",
            product
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting all product"
        })
    }
}

// get single product
exports.singleproductcontroller = async (req, res) => {
    try {
      const product = await productmodel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
      });
    }
  };

//product image controller
exports.productphotocontroller=async(req,res)=>{
    try{
        const product = await productmodel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getting product image",
      });
    }
}

//delete product controller
exports.deleteproductcontroller=async(req,res)=>{
    try{
        await productmodel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in deleting product",
      });
    }
}

//update product controller
exports.updateproductcontroller = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productmodel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
};

//filter product controller
exports.productfiltercontroller=async(req,res)=>{
  try{
    const {checked,radio}=req.body;
    let args={};
    if(checked.length>0){
      args.category=checked;
    }

    if(radio.length){
      args.price={$gte:radio[0],$lte:radio[1]}

    }

    const product=await productmodel.find(args);
    res.status(200).send({
      success:true,
      product,
    })

  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error while filtering product"
    })
  }
};

//product count controller
exports.productcountcontroller=async(req,res)=>{
  try{
    const total=await productmodel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      total,
    })
  }catch(error){
    console.log(error);
    res.status(400).send({
      success:false,
      error,
      message:"Error in counting product"
    })
  }
};

//product list base on page
exports.perpageproductcontroller=async(req,res)=>{
  try{
    const perpage=6;
    const page=req.params.page ? req.params.page : 1;
    const product=await productmodel.find({}).select("-photo").skip((page-1)*perpage).limit(perpage).sort({createdAt:-1})
    res.status(200).send({
      success:true,
      product
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in getting per page product"
    })
  }
}

//search product
exports.searchproductcontroller=async(req,res)=>{
  try{
    const {keyword}=req.params;
    const result=await productmodel.find({
      $or:[
        {name:{$regex:keyword,$options:'i'}},
        {description:{$regex:keyword,$options:'i'}}
      ]
    }).select("-photo");
    res.json(result);
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in searching product"
    })
  }
}

//similar product
exports.relatedproductcontoller=async(req,res)=>{
  try{
    const {pid,cid}=req.params;
    const products=await productmodel.find({
      category:cid,
      _id:{$ne:pid},
    }).select("-photo").limit(3).populate("category");
    res.status(200).send({
      success:true,
      products,
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error while getting related product",
      error
    })
  }
}

//product related category
exports.productcategorycontroller=async(req,res)=>{
  try {
    const category=await Categorymodel.findOne({slug:req.params.slug});
    const products=await productmodel.find({category}).populate("category");
    res.status(200).send({
      success:true,
      category,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in getting product category",
      error
    })
  }
}