const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const { getTokenFrom } = require('./reqHelper')

userRouter.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        password: hash,
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User
        .find({})

    res.json(users.map(u => u.toJSON()))
})

userRouter.get('/:phone', async (req, res) => {
    const token = getTokenFrom(req)

    // const decodedToken = jwt.verify(token, process.env.SECRET)

    // if (!token || !decodedToken) {
    //     return res.status(401).json({ error: 'token missing or invalid' })
    // }

    const user = await User
        .findOne({ phone: req.params.phone })

    res.json(user.toJSON())
})

//Errors yet to be cleared in this route
userRouter.put('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)

    // const decodedToken = jwt.verify(token, process.env.SECRET)

    // if (!token || !decodedToken) {
    //     return res.status(401).json({ error: 'token missing or invalid' })
    // }

    const toUpdate = {
        name: body.name,
        phone: body.phone,
        email: body.email,
        city: body.city
    }

    const updatedUser = await User.findByIdAndUpdate(token.id, toUpdate)
    console.log('Database return', updatedUser);

    res.json(toUpdate)
})

module.exports = userRouter