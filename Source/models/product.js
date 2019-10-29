var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId= Schema.Types.ObjectId;

var phoneInfoSchema = new Schema({
    screenSize: String,
    frontCam: String,
    backCam: String,
    cpu: String,
    ram: String,
    storageCapacity: String,
    memoryCard: String,
    sim: String,
    os: String,
})

var productSchema = new Schema({
    name: String,
    price: {type: Number, required:true},
    promotion: Number,
    phoneInfo: phoneInfoSchema,
    typeProduct: { type: ObjectId, ref: 'typeProduct'},
    imagePaths: Array,
    quantity:Number,
    description:String,
    alias:String
});

module.exports = mongoose.model('Product',productSchema);