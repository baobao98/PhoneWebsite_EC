var mongosee=require('mongoose');
var Schema=mongosee.Schema;

var storeInfo=new Schema({
    phoneNumb: String,
    address:String,
    email:String,
    name:String,
    date:Date,
    company:Array
})

module.exports=mongosee.model('storeInfo',storeInfo);