const mongoose = require('mongoose');
var UserSchema =new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: Number, required: true }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;