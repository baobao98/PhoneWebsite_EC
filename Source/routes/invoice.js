const express = require('express')
const Invoices = express.Router()
const nodemailer = require("nodemailer");
const cors = require("cors")
const Product = require("../models/product")
const Invoice = require("../models/invoice")
const mailService = require("../services/mailService")

Invoices.use(cors())

//create invoice
Invoices.post('/create', async (req, res) => {
    //create new instance
    var inv = new Invoice();

    inv.code = await generateCode();
    inv.receiver = req.body.receiver;
    inv.address = req.body.address;
    inv.email= req.body.email;
    inv.note = req.body.note;
    inv.phoneNumber = req.body.phoneNumber;
    inv.products = req.body.products;
    // inv.state = req.body.state;
    inv.typeOfPayment = req.body.typeOfPayment;

    inv.save( async (err) => {
        if (err) {
            return res.send(err);
        }
        inv.products.forEach(proOrdered => {
            Product.findById({ _id: proOrdered.product._id }, function (err, pro) {
                //if (err) console.log(err);
                pro.quantity = pro.quantity - proOrdered.quantity;
                Product.findByIdAndUpdate({ _id: pro._id }, pro, err => {
                    //console.log(err);
                })
            })
        });
        await mailService.option(inv.products,inv.email, inv.code, inv.receiver, new Date.now);
        mailService.send();
        
        res.json({ message: 'Invoice created' });
    })
})

let generateCode = () => {
    var code = 'BH' + Math.floor(Math.random() * 100000);
    return code;
}
// get all invoice
Invoices.post('/get', async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const invoices = await Invoice.paginate({}, options);
            return res.json(invoices);
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 100
            };
            // const invoices = await Invoice.paginate({}, options);
            // return res.json(invoices);
            Invoice.find({ state: req.body.status }).then(async data => {
                var inv = await PaginatorArray(data, options.page, options.limit);
                res.json({ "docs": inv.data, "totalDocs": inv.total, "totalPages": inv.total_pages });
            }).catch(err => {
                console.log(err)
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

function PaginatorArray(items, page, per_page) {

    var page = page,
        per_page = per_page,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
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
            $gte: new Date(2019, 08, 19),
            $lte: new Date(2019, 10, 19)
        }
    }, function (err, inv) {
        if (err) console.log(err);

        res.json(inv);
    })
})
//===END Filter
// Invoices.post('/testmail', async (req, res) => {
//     let total = await req.body.total;
//     let code = await req.body.code;
//     let products = await req.body.products;
//     let name = await req.body.name;
//     let date= Date.now();

//     await mailService.option(products,total,code,name,date);
//     mailService.send();
// })

//on routes end at /:invoice_id
Invoices.route('/:invoice_id')
    //get the type product with id
    .get((req, res) => {
        Invoice.find({code: req.params.invoice_id},'code receiver state' , function (err, inv) {
            if (err) return res.send(err);

            //return that invoice
            res.json(inv);
        })
    })
    .put((req, res) => {
        Invoice.findByIdAndUpdate(req.params.invoice_id, { $set: { state: req.body.state } }, (err, inv) => {
            if (err) return res.send(err);
            // console.log('updated')
        })
    })
// .delete((req,res)=>{
//     typeProduct.remove({
//         _id:req.params.typeproduct_id
//     }, err=>{
//         if(err) return res.send(err)
//         res.json({message:'successfully deleted'})
//     })
// })

module.exports = Invoices;


