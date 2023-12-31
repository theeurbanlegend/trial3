const express=require('express')
const connectDB = require('./db/db')
const route = require('./routes/postRoutes')
const cors=require('cors')
require('dotenv').config()
const app=express()
connectDB()
app.use(express.json())
app.use(cors(
    {origin:process.env.TRUSTED_URL
    }
))
console.log(process.env.TRUSTED_URL)
app.use('/api',route)

app.listen(process.env.PORT,()=>{
    console.log(`Server is up and running on port ${process.env.PORT}`)
})