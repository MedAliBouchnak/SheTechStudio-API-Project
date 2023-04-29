const express = require('express')
require('dotenv').config()
const app = express()
const port  = process.env.PORT


app.use(express.json())
app.use(require('cors')())


// connect database
const connectDB = require("./config/connectDB")
connectDB()

// routes
app.use('/api/v1/user', require("./routes/userRoutes"))
app.use('/api/v1/game', require("./routes/gameRoutes"))

// create server
app.listen(port, () => console.log("server running on port :", port))