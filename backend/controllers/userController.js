const User = require('../models/User')
const userController = {};

userController.findUserByPhoneNumber = async (userData) => {
    const userPhoneNumber = userData.phoneNumber
    const userRegistered = User.find({'phoneNumber': userPhoneNumber})
    return userRegistered
}

userController.createUser = async (userData) => {
    const { displayName, phoneNumber } = userData
    const newUser = new User ({
        username: displayName,
        phoneNumber
    })
    await newUser.save()
    return newUser
}

module.exports = userController;