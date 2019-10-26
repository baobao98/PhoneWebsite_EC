const express= require('express')
const Staffs= express.Router()
const cors=require("cors")
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')

const Staff= require("../models/user")
Staffs.use(cors())

process.env.SECRET_KEY= 'huynbao' 

Staffs.post('/register',(req,res)=>{
    const today=new Date()

    const staffData ={
        name: req.body.name,
        username:req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        avatar:req.body.avatar,
        dateOfBirth:req.body.dateOfBirth,
        created:today
    }

    Staff.findOne({
        username:req.body.username
    })
    .then(staff=>{
        if(!staff){
            bcrypt.hash(req.body.password, 10, (err,hash)=>{
                staffData.password=hash
                Staff.create(staffData)
                .then(staff=>{
                    res.json({status: staff.username + " Registered"})
                })

                .catch(err=>{
                    res.send('error: ' +err)
                })
            })
        }else{
            res.json({error:'Staff already exists'})
        }
    })
    .catch(err=>{
        res.send('error: ' + err)
    })
})

Staffs.post('/login',(req,res)=>{
    Staff.findOne({
        username:req.body.username
    })
    .then(staff=>{
        if(staff){
            if(bcrypt.compareSync(req.body.password,staff.password)){
                const payload ={
                    _id: staff._id,
                    username:staff.username,
                    role:staff.role,
                    email:user.email
                }
                let token=jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                res.json({token:token})
            }else{
                res.json({error:"Staff does not exist"})
            }
        }else{
            res.json({error:"Staff does not exist"})
        }
    })
    .catch(err=>{
        res.send('error: '+err)
    })
})

Staffs.get('/profile',(req,res)=>{
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    Staff.findOne({
        _id: decoded._id
    })
    .then(staff=>{
        if(staff){
            res.json(staff)
        }else{
            res.send("Staff does not exist")
        }
    })
    .catch(err=>{
        res.send('err: '+err)
    })
})


module.exports  = Staffs;