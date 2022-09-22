const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
app.use(express.urlencoded({extended:true,limit:"20mb"}))
app.use(express.json({limit:"20mb"}))
require("dotenv").config()
const URI = process.env.MONGO_URI
mongoose.connect(URI,(err)=>{
    console.log("Mongoose has connected successfully")
})
const PORT = process.env.PORT
const userRouter = require("./routes/user.route")
const adminRouter = require("./routes/admin.route")
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use(express.static("build"))
app.get("/*",(req,res)=>{
    res.sendFile(__dirname+"/build/index.html")
})
app.listen(PORT,()=>{
    console.log("App is listening at Port :" + PORT)
})