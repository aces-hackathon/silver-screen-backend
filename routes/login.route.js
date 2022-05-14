// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const User = require('../models/user.model')
const Theatre = require('../models/theatre.model')

loginRouter.post('/', async (req, res) => {
    const body = req.body
    // console.log(body)

    const user = await User.findOne({
        $or: [{ phone: body.phone }, { email: body.email }]
    })

    console.log(user)

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid email or password'
        })
    }

    // const userForToken = {
    //     username: user.phone,
    //     id: user._id,
    // }

    // const token = jwt.sign(
    //     userForToken,
    //     process.env.SECRET,
    //     { expiresIn: 60*60*24 },   
    // )
    
    res.status(200).send({
        name: user.name,
        phone: user.phone,
        id: user.id,
    })
})

loginRouter.post('/theatres', async (req, res) => {
    const body = req.body

    const theatre = await Theatre.findOne({
        $or: [{ phone: body.phone }, { email: body.email }]
    })

    const passwordCorrect = theatre === null
        ? false
        : await bcrypt.compare(body.password, theatre.password)

    if (!(theatre && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid email or password'
        })
    }

    res.status(200).send({
        name: theatre.name,
        phone: theatre.phone,
        id: theatre.id,
    })
})

//Email/sms confirmation remaining
// loginRouter('/forgot', (req, res) => {
//     const body = req.body

//     const user = await User.findOne({
//         $or: [{ username: body.phone }, { email: body.email }]
//     })

//     if (!user) {
//         return res.status(401).json({
//             error: 'invalid username or password'
//         })
//     }
// })


loginRouter.post('/forgot', async (req, res) => {
    const body = req.body
    const hash = await bcrypt.hash(req.body.password, 10)

    const user = await User.findOneAndUpdate({
        $or: [{ username: body.phone }, { email: body.email }]
    }, {
        password: hash
    })

    if (!user) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    
})

loginRouter.post('/forgot-theatres', async (req, res) => {
    const body = req.body
    const hash = await bcrypt.hash(req.body.password, 10)

    const theatre = await Theatre.findOneAndUpdate({
        $or: [{ username: body.phone }, { email: body.email }]
    }, {
        password: hash
    })

    if (!theatre) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
})

module.exports = loginRouter