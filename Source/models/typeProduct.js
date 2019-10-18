var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId= Schema.Types.ObjectId;
mongoose.Promise=global.Promise;

var typeProductSchema= new Schema({
    name: {type:String,required:true,index:{unique:true}},
    no: Number, // number order on menu
    alias:String,
    products: [{ type: ObjectId, ref: 'product'}],
})

module.exports = mongoose.model('TypeProduct',typeProductSchema);