const User = require('../models/User')
const userController = {};

userController.findExistingUser = async (userData) => {
    const userName = userData.displayName
    const userPhoneNumber = userData.phoneNumber
    const user = User.findOne({
        'phoneNumber': userPhoneNumber,
        'username': userName
    }).populate({
        path: 'contacts',
        model: 'User'
    })
    return user
}

userController.findUserByPhoneNumber = async (phoneNumber) => {
    const userRegistered = User.findOne({'phoneNumber': phoneNumber})
    return userRegistered
}

userController.findUserById = async (userId) => {
    const user = await User.findOne({_id: userId}).populate({
        path: 'contacts',
        model: 'User'
    })
    return user
}

userController.findUsersByName = async (userName) => {
    const usersName = User.find({
        "username" : {'$regex' : '^' + userName + '', '$options' : 'i'
    }}).populate({
        path: 'contacts',
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

userController.addNewContact = async (userId, newContactId) => {
    await User.findOneAndUpdate({ _id: userId },
        {
            $push: {
                contacts: newContactId
            }
        }
    )
    await User.findOneAndUpdate({ _id: newContactId },
        {
            $push: {
                contacts: userId
            }
        }
    )
}

userController.addSocketIdToUser = async (userId, socketId) => {
    await User.findOneAndUpdate({ _id: userId }, { socketId: socketId }
    )
}

userController.removeSocketIdFromUserBySocketId = async (socketId) => {
    await User.findOneAndUpdate({ socketId: socketId },
        {
                socketId: ""
        }
    )
}

userController.deleteContactById = async (userLoggedId, contactId) => {
    console.log("'ids", userLoggedId, contactId)
    console.log("user", await User.findOne({_id: userLoggedId}).populate({path: 'contacts'}))
    console.log("paraeliminar", await User.findOne({_id: userLoggedId}).populate({
        path: 'contacts'
    }).select({'contacts._id': contactId})
    )
    // await User.findOneAndDelete({_id: userLoggedId}, {'contacts._id': contactId})
}

userController.changeProfileImage = async (userLoggedId, newImage) => {
    await User.findOneAndUpdate({_id: userLoggedId}, {
        avatar: newImage
    })
}

module.exports = userController;