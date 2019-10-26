var mongosee = require('mongoose');
var Schema = mongosee.Schema;

var storeInfo = new Schema({
    phoneNumb: String,
    address: String,
    email: String,
    name: String,
    date: Date,
    company: String
})

storeInfo.statics = {
    getAll() {
        return this.find({}).exec(); // find moi co exec
    },
    createNew(info) {
        return this.create(info)
    }
}


module.exports = mongosee.model('storeInfo', storeInfo);