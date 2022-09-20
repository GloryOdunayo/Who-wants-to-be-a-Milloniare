const userModel = require("../models/user.model");
const questionModal = require("../models/question.model")
let cloudinary = require('cloudinary')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});
const jwt = require("jsonwebtoken");
const registerUser = (req,res)=>{
    console.log(req.body)
    let {password} = req.body
    let form = new userModel(req.body)
    form.save((err)=>{
        if(err){
            res.send({message:"An error occured",status:false})
        }else{
            res.send({message:"User signed up successfully",status:true})
        }

    })
}

const authenticateUser = (req,res)=>{
    let {password,email} = req.body
    console.log(req.body)
    userModel.findOne({email:req.body.email},(err,user)=>{
        if(err){
            res.send({message:"Internal Server Error",status:false})
        }else{
            if(!user){
                res.send({message:"Invalid credentials",status:false})
            }else{
                user.validatePassword(password,(err,same)=>{
                    // console.log(same)
                    if(!same){
                        res.send({message:"Password is incorrect",status:false})
                    }else{
                        let secret = process.env.SECRET
                        let myToken = jwt.sign({email},secret,{expiresIn:"1h"})
                        console.log(myToken)
                        res.send({message:"User sign in successfully",status:true,myToken})
                    }
                })
            }
        }
    })
}

const getDashboard = (req,res)=>{
    let secret = process.env.SECRET
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,secret,(err,result)=>{
        if(err){
            console.log(err)
            res.send({status:false,message:"error"})
        }else{
            let email = result.email
            res.send({status:true,message:"user authenticated",email})
            console.log(result)
        }
    })
}

const dashboard=(req,res)=>{
    let email = req.body.currentUser
    userModel.findOne({email:email},(err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:"done successfully",status:true,result})
            console.log(result)
        }
     //     res.send(result)
    })
     
}

const uploadFile=(req,res)=>{
    console.log(req.body); 
    let file= req.body.file  
    cloudinary.v2.uploader.upload(file, (err, result) =>{
    if(err){
        console.log(err);
    } else{
        console.log(result.url)
        let img =result.url
        userModel.findOneAndUpdate({email:req.body.currentUser},{image:img},(err,result)=>{
            if (err){
                console.log(err);
                res.send({message: "upload failed", status:false})
            }else{
                console.log(result);
                res.send({message:"Image uploaded successfully", status:true})
            }
            
        })
    };
    
  })
}


module.exports = {registerUser,authenticateUser, getDashboard,dashboard,uploadFile }