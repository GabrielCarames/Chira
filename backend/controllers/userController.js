const User = require('../models/User')
const userController = {};

userController.findExistingUser = async (userData) => {
    const userName = userData.displayName
    const userPhoneNumber = userData.phoneNumber
    const user = User.findOne({
        'phoneNumber': userPhoneNumber,
        'username': userName
    }).populate({
        path: 'friends',
        model: 'User'
    })
    return user
}

userController.findUserByPhoneNumber = async (phoneNumber) => {
    const userRegistered = User.findOne({'phoneNumber': phoneNumber})
    return userRegistered
}

userController.findUserById = async (userId) => {
    const user = await User.find({_id: userId}).populate({
        path: 'friends',
        model: 'User'
    })
    return user
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

userController.addSocketIdToUser = async (userId, socketId) => {
    await User.findOneAndUpdate({ _id: userId },
        {
            $push: {
                socketId: socketId
            }
        }
    )
}

userController.removeSocketIdFromUserBySocketId = async (socketId) => {
    await User.findOneAndUpdate({ socketId: socketId },
        {
            $pull: {
                socketId: socketId
            }
        }
    )
}

module.exports = userController;