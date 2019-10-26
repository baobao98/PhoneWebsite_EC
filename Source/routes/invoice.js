const express = require('express')
const Invoices = express.Router()
const cors = require("cors")

const Product = require("../models/product")
const Invoice = require("../models/invoice")

Invoices.use(cors())

//create invoice
Invoices.route('/')
    .post((req, res) => {
        //create new instance
        var inv = new Invoice();

        inv.receiver = req.body.receiver;
        inv.address = req.body.address;
        inv.note = req.body.note;
        inv.phoneNumber = req.body.phoneNumber;
        inv.products = req.body.products;
        inv.state = req.body.state;
        inv.typeOfPayment = req.body.typeOfPayment;

        inv.save((err) => {
            if (err) {
                return res.send(err);
            }
            inv.products.forEach(proOrdered => {
                Product.findById({ _id: proOrdered._id }, function (err, pro) {
                    //if (err) console.log(err);
                    pro.quantity = pro.quantity - proOrdered.quantity;
                    Product.findByIdAndUpdate({ _id: pro._id }, pro, err => {
                        //console.log(err);
                    })
                })
            });
            res.json({ message: 'Invoice created' });
        })
    })
    // get all invoice
    .get((req, res) => {
        Invoice.find((err, inv) => {
            if (err) return res.send(err);
            //return all invoice
            res.json(inv);
        })
    })
//===BEGIN Filter

//by state
Invoices.get('/filterByState', (req, res) => {

    var state = req.body.state;

    Invoice.find({ state: state }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//by type of payment 
Invoices.get('/filterByState', (req, res) => {

    var typeOfPayment = req.body.typeOfPayment;

    Invoice.find({ state: typeOfPayment }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//by range date
Invoices.get('/filterByState', (req, res) => {

    // var startDate= new Date('2019-08-17T03:24:00');
    // console.log(startDate);
    // var endDate= new Date('2019-10-17T03:24:00');
    // var endDate;
    // var startDate = req.body.startDate;
    // if (req.body.endDate) {
    //     endDate = req.body.endDate;
    // }
    // else {
    //     endDate = Date.now();
    // }
    // console.log("date: "+ startDate+", "+endDate);

    Invoice.find({
        dateOrdered: {
            $gte: new Date(2019,08,19),
            $lte: new Date(2019,10,19)
        }
    }, function (err, inv) {
        if(err) console.log(err);

        res.json(inv);
    })
})
//===END Filter


//on routes end at /:invoice_id
Invoices.route('/:invoice_id')
    //get the type product with id
    .get((req, res) => {
        Invoice.findById(req.params.invoice_id, function (err, inv) {
            if (err) return res.send(err);

            //return that invoice
            res.json(inv);
        })
    })



// .put((req,res)=>{
//     typeProduct.findById(req.paramsInvoic.invoice_id,(err,inv)=>{
//         if (err) return res.send(err);

//         //if(req.body.receiver) type.alias=req.body.alias;

//         //save the product
//         type.save(err=>{
//             if(err) return res.send(err);

//             //return a message 
//             res.json({message:'type of product updated'})
//         })
//     })
// })
// .delete((req,res)=>{
//     typeProduct.remove({
//         _id:req.params.typeproduct_id
//     }, err=>{
//         if(err) return res.send(err)
//         res.json({message:'successfully deleted'})
//     })
// })

module.exports = Invoices;


