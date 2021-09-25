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
    const user = await User.find({_id: userId}).populate({
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

userController.editUserNameByUserName = async (userLoggedId, originalUserName, newUserName) => {
    console.log("original", userLoggedId,originalUserName)
    const rer = await User.find().populate({
        path: 'contacts',
        model: 'User'
    })
    console.log("rer", rer)
    // users: {$in: friendId} { "$match": { "value.D": "B" } }
    // console.log("ueasdasdasdsr",  await User.aggregate([{ "$match": { 'contacts.username': originalUserName}}]))
    console.log("ueasdasdasdsr",  await User.find({contacts: {$elemMatch:{'username': originalUserName}}}))
    // .then(async (userLogged) => {
    //     await userLogged.contacts.findOneAndUpdate({ username: originalUserName },
    //         {
    //             username: newUserName
    //         }
    //     )
    // })
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

module.exports = userController;