//Imports
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(bodyParser.urlencoded({extended: true}))

//Routes
app.get("/", (req, res) => {
  
})

//Export App
module.exports = app

