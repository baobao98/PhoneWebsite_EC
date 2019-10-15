var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise =global.Promise;

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
    typeProduct_id: { type: ObjectId, ref: 'TypeProduct'},
    imagePaths: Array,
    quantity:Number,
    description:String,
    alias:String
});

module.exports = mongoose.model('Product',productSchema);