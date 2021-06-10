const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")

class AuthController{

    static async register(req, res){
        //Create new user in database
        const {email, username, password, password2} = req.body
        let errors = []
        if(!email || !username || !password || !password2){
            res.send({message:'Please fill in all the fields'});
            errors++
        }
        if(password != password2){
            res.send({message:'Passwords dont match'});
            errors++
        }

        if(!errors){
            if(email && username){
                const foundEmail = await User.where(`email='${email}'`)
                const foundUsername = await User.where(`username='${username}'`)
                if(foundEmail.length > 0 || foundUsername > 0){
                    if(foundEmail.length > 0) res.send({message: "Email already exists"});
                    if(foundUsername.length > 0) res.send({message: "Username already exists"})
                } else {
                    try{
                        const salt = await bcrypt.genSaltSync(10)
                        password = await bcrypt.hash(password, salt);
                        const newUser = new User({email, username, password})
                        newUser.save()
                        res.send({message: "Successfully registered"})
                    } catch(err){
                        throw err
                    }
                }
            } 
        }

        res.end()
       
    }

    static async login(req, res){
        const {name, password} = req.body
        
        if (name && password) {
            //Get user from model
            const passQuery = await db.query(`SELECT password FROM Users WHERE email='${name}' OR username='${name}'`)
        
            const bcryptPassword = await bcrypt.compareSync(password, passQuery[0].password);
            const user = await User.where(`email='${name}' OR username='${name}'`)
            //console.log(bcryptPassword)
            if(user && bcryptPassword){
                //Login stuff create and return hash
                res.send({message: 'Successfully Logged In'})
            } else {
                res.send({message: 'Invalid Username/email or password'})
            }
        } else {
            res.send({message: 'Please enter Username/Email and Password!'});
        }

        res.end()
    }


    static async logout(req, res){

    }


}

module.exports = AuthController