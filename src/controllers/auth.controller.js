const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")

class AuthController{

    static async register(req, res){
        //Create new user in database
        let {email, username, password, password2} = req.body
        let errors = 0
        if(!email || !username || !password || !password2){
            res.send({message:'Please fill in all the fields'});
            errors++
        }
        if(password != password2){
            res.send({message:'Passwords dont match'});
            errors++
        }

        if(!errors){
            const foundEmail = await User.where(`email='${email}'`)
            const foundUsername = await User.where(`username='${username}'`)
            if(foundEmail || foundUsername){
                if(foundEmail) res.send({message: "Email already exists"});
                else if(foundUsername) res.send({message: "Username already exists"});
            } else {
                try{
                    const salt = await bcrypt.genSaltSync(10)
                    password = await bcrypt.hash(password, salt);
                    const newUser = new User({email, username, password})
                    await newUser.save()
                    //Send message and authentication key
                    res.send({message: "Successfully registered"})
                } catch(err){
                    res.send({message: "Unsuccessfully registered"})
                    throw err
                }
            }
        }

        res.end()
    }

    static async login(req, res){
        const {name, password} = req.body
        //console.log(req.body)
        if (name && password) {
            //Get user from model
           
            const user = await User.where(`email='${name}' OR username='${name}'`)
            const bcryptPassword = bcrypt.compareSync(password, user ? user.cols.password : '');
            if(user && bcryptPassword){
                //Send message and authentication key
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