let mongoose = require('../config').mongoose

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    registrationDate: Date,
    lastLoginDate: Date,
});

module.exports = mongoose.model('User', userSchema);
