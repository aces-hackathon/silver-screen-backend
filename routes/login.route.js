const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const User = require('../models/user.model')

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        $or: [{ username: body.phone }, { email: body.email }]
    })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.phone,
        id: user._id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60*24 },   
    )
    
    res.status(200).send({
        token,
        name: user.name,
        phone: user.phone,
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


loginRouter('/forgot', (req, res) => {
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

module.exports = loginRouter