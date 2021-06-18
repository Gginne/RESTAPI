const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")
const {generateKey} = require("../test/keys")

class AuthController{

    static async register(req, res){
        //Create new user in database
        let {email, username, password, password2} = req.body

        if(!email || !username || !password || !password2){
            res.status(400).json({message:'Please fill in all the fields'});
        }
        if(password != password2){
            res.status(400).json({message:'Passwords dont match'});
        }

        const foundEmail = await User.where(`email='${email}'`)
        const foundUsername = await User.where(`username='${username}'`)
        if(foundEmail || foundUsername){
            if(foundEmail) return res.status(400).json({message: "Email already exists"});
            else if(foundUsername) return res.status(400).json({message: "Username already exists"});
        } else {
            try{
                const salt = await bcrypt.genSaltSync(10)
                password = await bcrypt.hash(password, salt);
                const newUser = new User({email, username, password})
                await newUser.save()
                //Send message and authentication key
                const {email, username, id} = newUser.cols
                return res.json({user: {email, username, id}, key: generateKey()})
            } catch(err){
                return res.status(400).json({message: "Unsuccessfully registered"})

            }
        }
        

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
                const {email, username, id} = user.cols
                return res.json({user: {email, username, id}, key: generateKey()})
            } else {
                return res.status(400).json({message: 'Invalid Username/email or password'})
            }
        } else {
            return res.status(400).json({message: 'Please enter Username/Email and Password!'});
        }

    }


    static async logout(req, res){

    }


}

module.exports = AuthController