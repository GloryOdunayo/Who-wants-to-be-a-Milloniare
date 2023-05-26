const mongoose = require("mongoose")
let scoreSchema = mongoose.Schema({
    finalScore:{type:String, required:true},
    token:{type:String, required:true}
})

let scoreModel = mongoose.model("quizscore_collection", scoreSchema)
module.exports = scoreModel