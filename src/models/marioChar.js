const mongoose = require("mongoose");

//  Your code goes here
const marioSchema = new mongoose.Schema({ 
    name: String, 
    weight: Number 
});
const marioModel = mongoose.model("mariochar", marioSchema);
module.exports = marioModel;
