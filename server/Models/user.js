const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  picture: String
})

var user = mongoose.model('User',userSchema)

module.exports = user