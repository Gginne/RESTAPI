const User = require('../models/User')
const bcrypt = require('bcrypt')

class AuthController{

    static register = async (req, res) => {
        //Create new user in database
        const {email, username, password, password2} = req.body
        let errors = []
        if(!email || !username || !password || !password2){
            console.log('Please fill in all the fields');
            res.send({message:'Please fill in all the fields'});
            errors++
        }
        if(password != password2){
            console.log('Passwords dont match');
            res.send({message:'Passwords dont match'});
            errors++
        }

        if(!errors){
            if(email && username){
                const foundEmail = User.where(`email=${email}`)
                const foundUsername  = User.where(`username=${username}`)
                if(foundEmail.length > 0 || foundUsername > 0){
                    if(foundEmail.length > 0) res.send({message: "email already exists"});
                    if(foundUsername.length > 0) res.send({message: "username already exists"})
                } else {
                    try{
                        password = await bcrypt.hash(password, 10);
                        const newUser = new User({email, username, password})
                        newUser.save()
                    } catch(err){
                        throw err
                    }
                }
            } 
        }

        res.end()
       
    }

    static login = async (req, res) => {
        const {name, password} = req.body
        if (name && password) {
            //Get user from model
            const password_hash = await db.query("SELECT password FROM users WHERE email = ? OR username = ?", [name])
            const bcryptPassword = bcrypt.compareSync(password, password_hash);
            const user = User.where(`email=${name} OR username=${name}`)[0]
            if(user && bcryptPassword){
                //Login stuff
            } else {
                res.send({message: 'Invalid Username/email or password'})
                res.end()
            }
        } else {
            res.send({message: 'Please enter Username/Email and Password!'});
            res.end();
        }
    }


    static logout = async (req, res) => {

    }


}

module.exports = AuthController