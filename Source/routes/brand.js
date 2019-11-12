const express = require('express')
const brands = express.Router()
const cors = require("cors")

const brand = require("../models/brand")
brands.use(cors())


brands.post('/create',(req, res) => {
    //create new instance
    var br = new brand();
    br.name = req.body.name;
    br.no = req.body.no;
    br.alias = req.body.alias;

    br.save((err) => {
        if (err) {
            if (err.code == 11000) {
                return res.json({ sucesss: false, message: 'this brand already exists' })
            }
            else
                return res.send(err);
        }
        res.json({ message: 'brand created' });
    })
})

// get all brands 
brands.post('/get',async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const br= await brand.paginate({}, options);
            return res.json(br);
        }
        else {
            const options = {
                page: (req.body.pageIndex) ? req.body.pageIndex : 1,
                limit: (req.body.pageSize) ? req.body.pageSize : 50
            };
            const br= await brand.paginate({}, options);
            return res.json(br);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }

})

module.exports = brands;
