const express = require("express")
const router = express.Router()
const {registerAdmin,authenticateAdmin, getAdminDashboard, adminDashboard, adminUploadFile} = require("../controllers/admin.controller")
const { setQuestion, sendQuestion } = require("../controllers/question.controller")
router.get("/dashboard",getAdminDashboard)
router.post("/dashboard", adminDashboard)
router.post("/signup",registerAdmin)
router.post("/signin",authenticateAdmin)
router.post("/question",setQuestion)
router.post("/upload",adminUploadFile)
router.post("/getquestion",sendQuestion)
module.exports = router;