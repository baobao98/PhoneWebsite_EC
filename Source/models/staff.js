var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//

var staffSchema = new Schema({
    name: String,
    username: { type: String, required: true, index:{ unique:true}},
    password: { type: String, required: true, select: false},
    role: {
        type: String,
        enum: ['staff','admin'],
        required: true
    },
    email: String,
    avatar: String,
    dateOfBirth: Date,
    gender: Boolean
});


//
module.exports = mongoose.model('Staff', staffSchema);