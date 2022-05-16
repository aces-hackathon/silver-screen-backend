const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')
const initialValues = require('./initialValues')

const hashUserPasswords = async initialUsers => {
    let hashedUsers = initialUsers.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
    }))

    return Promise.all(hashedUsers)
}

const initUsers = async () => {
    await User.deleteMany({})

    hashedData = await hashUserPasswords(initialValues.userData)

    console.log(hashedData)

    const userObjects = hashedData.map(user => new User(user))
    const savedDataPromises = userObjects.map(user => user.save())

    await Promise.all(savedDataPromises)
}

const creds = {
    phone: 1234567890,
    password: 'bala',
}

const closeConnection = () => {
    mongoose.connection.close()
}

module.exports = {
    initUsers,
    creds,
    closeConnection,
}