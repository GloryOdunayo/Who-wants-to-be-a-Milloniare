const mongoose = require("mongoose")
let questionSchema = mongoose.Schema({
    question:{type:String,required:true},
    A:{type:String,required:true},
    B:{type:String,required:true,unique:true},
    C:{type:String,required:true},
    D:{type:String},
    answer:{type:String},
    email:{type:String},
    token:{type:String},
})
let questionModel = mongoose.model("question",questionSchema)
module.exports=questionModel