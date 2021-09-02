const User = require('../models/User')
const userController = {};

userController.findExistingUser = async (userData) => {
    const userName = userData.displayName
    const userPhoneNumber = userData.phoneNumber
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

userController.findUsersByName = async (userName) => {
    const usersName = User.find({
        "username" : {'$regex' : '^' + userName + '', '$options' : 'i'
    }}).populate({
            path: 'friends',
            model: 'User'
        })
    return usersName
    // {"username" : {$regex : userName}}
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

userController.addNewFriend = async (userId, newFriendId) => {
    await User.findOneAndUpdate({ _id: userId },
        {
            $push: {
                friends: newFriendId
            }
        }
    )
    await User.findOneAndUpdate({ _id: newFriendId },
        {
            $push: {
                friends: userId
            }
        }
    )
}

module.exports = userController;