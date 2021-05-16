//Imports
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const db = require("./database/db")

//App Setup
const app = express()
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(bodyParser.urlencoded({extended: true}))

//Routes
app.get("/", (req, res) => {
  res.write("<h1>Hello World</h1>")
  res.send()
})

//Export App
module.exports = app

