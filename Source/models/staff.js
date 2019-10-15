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
staffSchema.pre('save', function(next){
    var staff = this;
    //
    if(!staff.isModified('password')) return next();
    bcrypt.hash(staff.password, null, null, function (err,hash){
        if(err) return next(err);
        staff.password = hash;
        next();
    });
});
//
staffSchema.methods.comparePassword = function (password){
    var staff = this;

    return bcrypt.compareSync(password, staff.password);
};

//
module.exports = mongoose.model('Staff', staffSchema);