const mongoose = require('mongoose');
var UserSchema =new mongoose.Schema({
    us: { type: String, required: true },
    ps: { type: String, required: true }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;