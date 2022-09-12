const express = require("express")
const router = express.Router()
const {registerUser,authenticateUser, getDashboard} = require("../controllers/user.controller")
router.get("/dashboard",getDashboard)
router.post("/signup",registerUser)
router.post("/signin",authenticateUser)
module.exports = router;