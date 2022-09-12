const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const registerAdmin = (req,res)=>{
    // console.log(req.body)
    let {password} = req.body
    let form = new adminModel(req.body)
    form.save((err)=>{
        if(err){
            res.send({message:"An error occured",status:false})
        }else{
            res.send({message:"admin signed up successfully",status:true})
        }

    })
}

const authenticateAdmin = (req,res)=>{
    console.log(req.body)
    let {password,email} = req.body
    adminModel.findOne({email:req.body.email},(err,admin)=>{
        if(err){
            res.send({message:"Internal Server Error",status:false})
        }else{
            if(!admin){
                res.send({message:"Invalid credentials",status:false})
            }else{
                admin.validatePassword(password,(err,same)=>{
                    // console.log(same)
                    if(!same){
                        res.send({message:"Password is incorrect",status:false})
                    }else{
                        let secret = process.env.SECRET
                        let myToken = jwt.sign({email},secret,{expiresIn:"1h"})
                        console.log(myToken)
                        res.send({message:"admin sign in successfully",status:true,myToken})
                    }
                })
            }
        }
    })
}

const getAdminDashboard = (req,res)=>{
    let secret = process.env.SECRET
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,secret,(err,result)=>{
        if(err){
            console.log(err)
            res.send({status:false,message:"error"})
        }else{
            let email = result.email
            res.send({status:true,message:"admin authenticated",email})
            console.log(result)
        }
    })
}
module.exports = {registerAdmin,authenticateAdmin, getAdminDashboard }