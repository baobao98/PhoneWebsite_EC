var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

var typeProductSchema= new Schema({
    name: String,
    nation:String
})

module.exports = mongoose.model('TypeProduct',typeProductSchema);