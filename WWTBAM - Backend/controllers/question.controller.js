const questionModel = require("../models/question.model")
const jwt =require("jsonwebtoken");
const adminModel = require("../models/admin.model");

const setQuestion=(req,res)=>{
    let {token} = req.body
    adminModel.findOne({token:token},(err,result)=>{
    if (err) {
        res.send({message:"can't find the user",status:false})
    }else{
        let questionForm = new questionModel(req.body)
        questionForm.save((err,result)=>{
         if (err) {
            res.send({message:"Failed to add question" ,status:false})
            // console.log(err);
         }else{
            res.send({message:"Question add successful",status:true,result})
            // console.log(result);
         }   
        })
    }

})
}
const sendQuestion =async (req,res) =>{
    let {email,token}=req.body
    adminModel.findOne({token:token},(err,result)=>{
        if (err) {
            res.send({message:"can't find the this user" ,status:false})
        }else{   
            questionModel.find({email:email},(err,result)=>{
                if(err) throw err
                console.log(result);
                res.send({massage:"Here is your questions",result,status:true})
            })
        }
    })
   
}

const getTest=(req,res)=>{
    questionModel.find((err,result)=>{
        if(err){
            console.log(err);
        } else {
            if(!result){
                res.send({message:"Question not available",status:false})
            } else{
                // let round = result[Math.floor(Math.random()* result.length)]
                res.send({message:"Question Available", status:true, result})
                console.log(result)
            }
        }
    })
}

// const postScore=(req,res)=>{
//     console.log("No req");
// }

module.exports ={setQuestion,sendQuestion, getTest}