const express= require('express')
const Products= express.Router()
const cors=require("cors")
var mongoose = require('mongoose');
const Product= require("../models/product")
const TypeProduct= require("../models/typeProduct")
Products.use(cors())
//create  product
Products.route('/')
.post(async(req,res)=>{
    
    var pro=new Product();
    pro.name=req.body.name;
    pro.price=req.body.price;

    pro.typeProduct_id=req.body.Type;//req.body.type;
    //pro.imagePaths=req.body.imagePaths;
    //pro.quantity=req.body.quantity;
    //pro.description=req.body.description;
    //pro.alias=req.body.alias;

    pro.save((err,pro) => {
        if (err){
            if( err.code==11000){
                return res.json({sucesss:false, message:'this product already exists'});
                
            }
            else
                return res.send(err);
        }
        res.json({message:'Product created'});
        TypeProduct.updateOne({ _id: req.body.Type._id }, { $push: { products: pro._id } },
        function (error, success) {
          if (error) {
            console.log(error);
          }
        });
    })
})
// get all types product
.get((req,res)=>{
    Product.find((err,Product)=>{
        if(err) return res.send(err);

        //return the types
        res.json(Product);
    })
})
// //on routes end at /typeproduct/:typeproduct_id
// typeProducts.route('/:typeproduct_id')
//     //get the type product with id
//     .get((req,res)=>{
//         typeProduct.findById(req.params.typeproduct_id,function(err,type){
//             if(err) return res.send(err);

//             //return that type product
//             res.json(type);
//         })
//     })
//     .put((req,res)=>{
//         typeProduct.findById(req.params.typeproduct_id,(err,type)=>{
//             if (err) return res.send(err);

//             //set the new type of product if it exists in the request 
//             if(req.body.name) type.name=req.body.name;
//             if(req.body.no) type.no=req.body.no;
//             if(req.body.alias) type.alias=req.body.alias;

//             //save the product
//             type.save(err=>{
//                 if(err) return res.send(err);

//                 //return a message 
//                 res.json({message:'type of product updated'})
//             })
//         })
//     })
//     .delete((req,res)=>{
//         typeProduct.remove({
//             _id:req.params.typeproduct_id
//         }, err=>{
//             if(err) return res.send(err)
//             res.json({message:'successfully deleted'})
//         })
//     })

module.exports= Products;

