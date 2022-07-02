const route = require('./Routes/adminRoute');
var express = require('express');
const mongoose = require('mongoose')
const customerModel = require('./Models/customer.model');
const admindB = require('./Models/admin.model')
var cors = require('cors')
var twilio = require('twilio');
//const { response } = require('express');


require('dotenv').config();
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = new twilio(accountSid, authToken)
const app = express();
app.use(express.json())
app.use(cors())

//Mongo set-up
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.on('open', () => {
    console.log('Mongoose connected!')
})

app.get('/', (req, res) => {
    customerModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.get('/hospName/:hospName', (request, respsone) => {
    console.log(request.params.hospName)
    //db.inventory.find( { $and: [ { "date.name": request.params.hospName.trim() }, { "date.isChecked": true } ] } )
    admindB.find({ $and: [{ "date.name": request.params.hospName.toUpperCase() }, { "date.isChecked": true }] }).select({ "hosp_name": 1, "_id": 0 }).exec((err, res) => {
        if (err) {
            respsone.send(err)
            console.log(err)
        }
        else {
            respsone.send(res)
            //response.send(result)
            console.log(res)
        }
    })
})

app.get('/spec/:spec', (req, res) => {
    //console.log("Body is:",req.params.spec)
    admindB.find({ hosp_name: req.params.spec }).select({ "spec_name": 1, "_id": 0 }).exec((err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
            console.log(result)
            //console.log(result)
        }
    })
})

app.get('/docName/:docName', (req, res) => {
    //console.log("Body is:",req.params.docName)
    admindB.find({ spec_name: req.params.docName }).select({ "doc_name": 1, "_id": 0 }).exec((err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
            console.log(result)
        }
    })
})

app.get('/sendtext', (req, res) => {
    const { recipient, textmessage } = req.query
    //console.log(recipient, textmessage)
    client.messages.create({
        body: textmessage,
        to: "+91" + recipient,
        from: '+19126008970'
    }).then((message) => console.log(message.body)).catch((err) => console.log(err))
})
// Sending data to the Mongo dB
app.post('/data', async (req, res) => {
    const data = req.body
    const user = new customerModel(data)
    await user.save()
    res.json(user)

})
app.use('/admin', route)
app.listen(5000, () => console.log("Listening...!"))