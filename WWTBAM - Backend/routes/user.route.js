const express = require("express")
const { getTest } = require("../controllers/question.controller")
const router = express.Router()
const {registerUser,authenticateUser, getDashboard, dashboard, uploadFile, savescore, getscore} = require("../controllers/user.controller")
router.get("/test",(req,res)=>{
    res.send("test route");
})
router.get("/dashboard",getDashboard)
router.post("/test",getTest)
router.post("/signup",registerUser)
router.post("/signin",authenticateUser)
router.post("/dashboard", dashboard)
router.post("/upload",uploadFile)
router.post("/savescore", savescore)
router.post("/getscore",getscore)
// router.post("/score", postScore)
module.exports = router;