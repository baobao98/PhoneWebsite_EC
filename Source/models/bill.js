var mongosee=require('mongoose');
var Schema=mongosee.Schema;

var billSchema=new Schema({
    receiver: { type: String, required: true },
    address:{ type: String, required: true },
    note:String,
    phoneNubmer:{type: String, required:true },
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

module.exports=mongosee.model('Bill',billSchema);