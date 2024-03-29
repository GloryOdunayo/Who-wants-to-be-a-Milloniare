const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const corsOptions = {
    origin: 'https://wwtbam-frontend-43zu2zovu-okewoleglory-gmailcom.vercel.app/', // Replace with your client app's domain
    // 'https://famous-torte-02c20f.netlify.app',
    methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify the allowed headers
};

app.use(cors())
app.use(express.urlencoded({extended:true,limit:"20mb"}))
app.use(express.json())
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
// app.use(express.static("build"))
// app.get("/*",(req,res)=>{
//     res.sendFile(__dirname+"/build/index.html")
// })
app.listen(PORT,()=>{
    console.log("App is listening at Port :" + PORT)
})