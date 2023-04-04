const express = require('express')
const app = express()
const connectDB  = require('./database/connection')
app.use(express.json())
const dotenv = require("dotenv")
dotenv.config()

const cors = require('cors');

//load assests
app.use('/',require('./routes/router'))

//calling database
connectDB();

app.use(cors({origin:'*'}))

app.listen(process.env.PORT,() => {
    console.log("server running....")
})