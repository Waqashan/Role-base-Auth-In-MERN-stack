const mongoose=require("mongoose");

const ProductModel= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    product_code:{
        type:String,
        require:true
    },
   image:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("product_Data",ProductModel)
