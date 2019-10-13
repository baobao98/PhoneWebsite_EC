//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//
var CustomerSchema = new Schema({
    name: String,
    username: { type: String, required: true, index:{ unique:true}},
    password: { type: String, required: true, select: false},
    address: String,
    phoneNumber: Number,
    email: String,
    gender: Boolean,
    birthDay: Date
});
//
CustomerSchema.pre('save', function(next){
    var cus = this;
    //
    if(!cus.isModified('password')) return next();
    bcrypt.hash(cus.password, null, null, function (err,hash){
        if(err) return next(err);
        cus.password = hash;
        next();
    });
});
//
CustomerSchema.methods.comparePassword = function (password){
    var cus = this;

    return bcrypt.compareSync(password, cus.password);
};

//
module.exports = mongoose.model('Customer', CustomerSchema);