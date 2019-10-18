const express= require('express')
const typeProducts= express.Router()
const cors=require("cors")

const typeProduct= require("../models/typeProduct")
typeProducts.use(cors())

//create type product
typeProducts.route('/')
.post((req,res)=>{
    //create new instance
    var type =new typeProduct();
    type.name=req.body.name;
    type.no=req.body.no;
    type.alias= req.body.alias;
    //type.products=null;

    type.save((err)=>{
        if (err){
            if( err.code==11000){
                return res.json({sucesss:false, message:'this type of product already exists'})
            }
            else
                return res.send(err);
        }
        res.json({message:'type of product created'});
    })
})
// get all types product
.get((req,res)=>{
    typeProduct.find((err,typeProduct)=>{
        if(err) return res.send(err);

        //return the types
        res.json(typeProduct);
    })
})
//on routes end at /typeproduct/:typeproduct_id
typeProducts.route('/:typeproduct_id')
    //get the type product with id
    .get((req,res)=>{
        typeProduct.findById(req.params.typeproduct_id,function(err,type){
            if(err) return res.send(err);

            //return that type product
            res.json(type);
        })
    })
    .put((req,res)=>{
        typeProduct.findById(req.params.typeproduct_id,(err,type)=>{
            if (err) return res.send(err);

            //set the new type of product if it exists in the request 
            if(req.body.name) type.name=req.body.name;
            if(req.body.no) type.no=req.body.no;
            if(req.body.alias) type.alias=req.body.alias;

            //save the product
            type.save(err=>{
                if(err) return res.send(err);

                //return a message 
                res.json({message:'type of product updated'})
            })
        })
    })
    .delete((req,res)=>{
        typeProduct.remove({
            _id:req.params.typeproduct_id
        }, err=>{
            if(err) return res.send(err)
            res.json({message:'successfully deleted'})
        })
    })

module.exports= typeProducts;


