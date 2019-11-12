var mongosee=require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema=mongosee.Schema;

var invoiceSchema=new Schema({
    receiver: { type: String, required: true },
    address:{ type: String, required: true },
    note:String,
    phoneNumber:{type: String, required:true },
    products:{type: Array, required: true},
    state: Boolean,
    typeOfPayment:{
        type: String,
        enum:['COD','paypal','mastercard','visa','momo'],
        required:true,
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }
})


invoiceSchema.plugin(mongoosePaginate);
module.exports=mongosee.model('Invoice',invoiceSchema);