var express= require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express(); 
var mongoose = require('mongoose')
var port = process.env.PORT || 3000

// import routes
var Users= require('./routes/user.js')
var typeProducts= require('./routes/typeProduct.js')
var Products= require('./routes/product.js')

//middleware 
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

//connectiong string 
//-----localhost
const mongoURI ='mongodb://localhost/phoneShopDB';
//-----cloud host
// const mongoURI= "mongodb+srv://baobao:youonlylionkul@bbcluster0-2u8x9.mongodb.net/admin?retryWrites=true&w=majority";

//connect to mongo dbs
mongoose
.connect(mongoURI,{useNewUrlParser:true})
.then(()=> console.log("MongoDb Connected"))
.catch(err=> console.log(err))

//set up routes
app.use('/users',Users)
app.use('/typeproduct',typeProducts);
app.use('/product',Products);

//Kick-off
app.get("/",(req,res)=>{res.json('Hello World')})

//start server
app.listen(port,function(){
    console.log("Server is running on port: "+port)
})
