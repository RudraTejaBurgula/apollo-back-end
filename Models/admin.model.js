const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adminSchema = new schema({
    doc_id: { type: Number, required: true, unique: true },
    hosp_location: { type: String, required: true },
    doc_name: { type: String, required: true },
    hosp_name: { type: String, required: true },
    doc_number: { type: Number, required: true, unique: true },
    spec_name: { type: String, required: true },
    date: { type: Object, required: true }
})



module.exports = mongoose.model("doctorDetails", adminSchema)