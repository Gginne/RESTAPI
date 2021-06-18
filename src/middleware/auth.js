require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.redirect(301, "/")

    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        //console.log(decoded)
        req.user = decoded
        next()

    } catch(e){
        res.redirect(301, "/")
    }
}