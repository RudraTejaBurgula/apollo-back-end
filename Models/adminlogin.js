const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adminLogin = new schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
})
module.exports = mongoose.model("adminDetails", adminLogin)