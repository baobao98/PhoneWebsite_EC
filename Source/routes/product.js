const express = require('express')
const Products = express.Router()
const cors = require("cors")
var mongoose = require('mongoose');
const Product = require("../models/product")
const TypeProduct = require("../models/typeProduct")
Products.use(cors())
//create  product
Products.route('/')
    .post(async (req, res) => {

        var pro = new Product();
        pro.name = req.body.name;
        pro.price = req.body.price;
        pro.promotion = req.body.promotion;
        pro.phoneInfo = req.body.phoneInfo;
        pro.typeProduct_id = req.body.Type;
        pro.imagePaths = req.body.imagePaths;
        pro.quantity = req.body.quantity;
        pro.description = req.body.description;
        pro.alias = req.body.alias;

        pro.save((err, pro) => {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ sucesss: false, message: 'this product already exists' });

                }
                else
                    return res.send(err);
            }
            res.json({ message: 'Product created' });
            TypeProduct.updateOne({ _id: req.body.Type._id }, { $push: { products: pro._id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    }
                });
        })
    })
    // get all product
    .get((req, res) => {
        Product.find((err, Product) => {
            if (err) return res.send(err);

            //return the types
            res.json(Product);
        })
    })

//Get product by its type of product ID
Products.get('/getByType/:typeproduct_id',(req,res)=>{
    TypeProduct.findOne({_id: req.params.typeproduct_id})
                .populate('products')
                .exec(function(err,type){
                    if(err) return console.log(err);

                    //return the products
                    res.json(type.products);
                })
})

//on routes end at /product/:product_id
Products.route('/:product_id')
    //get the product by id
    .get((req, res) => {
        Product.findById(req.params.product_id, function (err, pro) {
            if (err) return res.send(err);

            //return that type product
            res.json(pro);
        })
    })
    .put((req, res) => {
        Product.findById(req.params.product_id, (err, pro) => {
            if (err) return res.send(err);

            //set the new type of product if it exists in the request 
            if (req.body.name) pro.name = req.body.name;
            if (req.body.price) pro.price = req.body.price;
            if (req.body.promotion) pro.promotion = req.body.promotion;
            if (req.body.phoneInfo) pro.phoneInfo = req.body.phoneInfo;
            if (req.body.typeproduct_id) pro.typeProduct_id = req.body.Type;
            if (req.body.imagePaths) pro.imagePaths = req.body.imagePaths;
            if (req.body.quantity) pro.quantity = req.body.quantity;
            if (req.body.description) pro.description = req.body.description;
            if (req.body.alias) pro.alias = req.body.alias;

            //save the product
            pro.save(err => {
                if (err) return res.send(err);

                //return a message 
                res.json({ message: 'product updated' })
            })
        })
    })
    .delete((req, res) => {
        Product.remove({
            _id: req.params.product_id
        }, err => {
            if (err) return res.send(err)
            res.json({ message: 'successfully deleted' })
        })
    })

module.exports = Products;

