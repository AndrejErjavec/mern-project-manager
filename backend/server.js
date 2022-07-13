const express = require('express')
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())

app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Server started on port ${port}`)
})