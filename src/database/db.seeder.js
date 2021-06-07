const User = require('../models/User')

module.exports = () => {
    console.log("Seeding database...")
    const userSeed = [
        {'email': 'user1@sample.com', 'username': 'user1', 'password': '111111'},
        {'email': 'user2@sample.com', 'username': 'user2', 'password': '222222'},
        {'email': 'user3@sample.com', 'username': 'user3', 'password': '333333'}
    ]
    
    userSeed.forEach(data => {
        const newUser = new User(data)
        newUser.save()
        console.log(newUser)
    })

}