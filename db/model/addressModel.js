const mongoose = require('mongoose');

let addressschema = new mongoose.Schema({
    name: { type: String, required:true },
    phone: { type: Number, required:true },
    address: { type: String, required: true },
    defaults: { type: Boolean, required: true }
})

let address = mongoose.model('address', addressschema);

module.exports = address;