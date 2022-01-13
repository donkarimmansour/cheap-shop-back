const express = require("express")
const app = express()
const morgan = require("morgan")
const passport = require("passport")
const DB = require("./database/db")

//env file
require("dotenv").config()

//database initialize
DB();

//development
if (app.get("env") == "development") {
    app.use(morgan("dev"))
}

//decoded data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//passport initialize
require("./config/passport")
app.use(passport.initialize());

module.exports = {app}
