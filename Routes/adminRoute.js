var express = require('express');
const { default: mongoose } = require('mongoose');
const admindB = require('../Models/admin.model');
const admin = require('../Models/adminlogin')
const route = express.Router();
route.get('/', async (request, response) => {
    try {
        const admin = await admindB.find()
        //console.log(Object.values(admin.date))
        response.json(admin)
    } catch (err) {
        response.send(err)
    }
});

route.get('/:id', async (request, response) => {
    try {
        const admin = await admindB.findById(request.params.doc_id)
        response.json(admin)
    } catch (err) {
        response.send(err)
    }
})
route.post('/edit', async (request, response) => {
    admindB.findOneAndUpdate(
        { doc_id: request.body.doc_id }, {
        hosp_location: request.body.hosp_location,
        doc_name: request.body.doc_name,
        hosp_name: request.body.hosp_name,
        doc_number: request.body.doc_number,
        spec_name: request.body.spec_name,
        date: request.body.date
    }, { new: true }, (error, data) => {
        if (error) {
            response.send(error)
            response.statusCode
        } else {
            response.send("Updated successfully.")
        }
    }
    )
})
route.post('/delete', async (request, response) => {
    admindB.findOneAndDelete({
        doc_id: request.body.doc_id
    }, (err, data) => {
        if (err) {
            response.send(error)
        } else {
            response.send("Deleted successfully.")
        }
    })

})
route.post('/', async (request, response) => {
    const admin = new admindB({
        doc_id: request.body.doc_id,
        hosp_location: request.body.hosp_location,
        doc_name: request.body.doc_name,
        hosp_name: request.body.hosp_name,
        doc_number: request.body.doc_number,
        spec_name: request.body.spec_name,
        date: request.body.date
    })
    try {
        const a1 = await admin.save()
        response.json(a1)
    } catch (err) {
        response.send(err).status()
    }
})

route.get('/adminLogin/:username/:password', (request, response) => {
    admin.find({ $and: [{ admin_name: request.params.username }, { password: request.params.password }] })
        .exec((err, result) => {
            if (err) {
                response.send(result).status()
            }
            else if (result.length === 0) {
                response.sendStatus(404)
            }
            else {
                response.send(result)
                // response.json(result)
            }
        })
})
module.exports = route