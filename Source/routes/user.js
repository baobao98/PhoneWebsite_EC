const express = require('express')
const users = express.Router()
const cors = require("cors")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require("../models/user")
users.use(cors())

process.env.SECRET_KEY = 'huynbao'

users.get('/', async (req, res) => {
    try {
        if (req.body.orderField) {
            let orderField = req.body.orderField;

            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize,
                sort: { [orderField]: (req.body.orderBy) ? req.body.orderBy : 'asc' }
            }

            const users = await User.paginate({}, options);
            return res.json(users);
        }
        else {
            const options = {
                page: req.body.pageIndex,
                limit: req.body.pageSize
            };
            const users = await User.paginate({}, options);
            return res.json(users);
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        birthday: req.body.birthday,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + " Registered" })
                        })

                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: ' User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({ token: token })
                } else {
                    res.json({ error: "User does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})


module.exports = users;