var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise =global.Promise;

var productSchema = new Schema({
    name: String,
    price: {type: Number, required:true},
    screenSize: String,
    frontCam: String,
    backCam: String,
    cpu: String,
    ram: String,
    storageCapacity: String,
    memoryCard: String,
    sim: String,
    os: String,
    typeProduct_id: { type: ObjectId, ref: 'TypeProduct'},
    frontImagePath: String,
    backImagePath: String,
    quantity:Number,
});

module.exports = mongoose.model('Product',productSchema);