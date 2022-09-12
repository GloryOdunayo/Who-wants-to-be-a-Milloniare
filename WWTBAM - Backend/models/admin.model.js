const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const adminSchema = mongoose.Schema({
    firstname: {type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
let saltRound = 10
adminSchema.pre("save",function(next){
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if(err){
            console.log(err)
        }else{
            this.password = hashedPassword
            next()
        }
    })
})
adminSchema.methods.validatePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
            callback(err,same)
        }else{
            next()
        }
    })
}
const adminModel = mongoose.model("admin_collection",adminSchema)
// const adminModel = mongoose.model("admin_collection",adminSchema)
module.exports = adminModel;