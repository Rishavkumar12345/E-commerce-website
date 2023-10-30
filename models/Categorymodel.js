const mongoose=require('mongoose')

const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

//module.exports=mongoose.model('category',categoryschema);
const Categorymodel = mongoose.model("Category", categoryschema);

module.exports = { Categorymodel };