const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Server started on port ${port}`)
})