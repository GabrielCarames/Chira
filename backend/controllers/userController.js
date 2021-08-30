const User = require('../models/User')
const userController = {};

userController.findExistingUser = async (userData) => {
    const userName = userData.displayName
    const userPhoneNumber = userData.phoneNumber
    console.log(userName, userPhoneNumber)
    const userCosa = User.findOne({
        'phoneNumber': userPhoneNumber,
        'username': userName
    })
    return userCosa
}

userController.findUserByPhoneNumber = async (userData) => {
    const userPhoneNumber = userData.phoneNumber
    const userRegistered = User.findOne({'phoneNumber': userPhoneNumber})
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