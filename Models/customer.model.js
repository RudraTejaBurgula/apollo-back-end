const mongoose = require("mongoose");
const schema = mongoose.Schema;
const customerSchema = new schema({
    doc_name: { type: String, required: true },
    patient_name: { type: String, required: true },
    hosp_name: { type: String, required: true },
    spec_name: { type: String, required: true },
    date: { type: String, required: true },
    patient_number: { type: Number, required: true }
})



module.exports = mongoose.model("Record", customerSchema)