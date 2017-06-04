const Users = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

function createUser (req,res,next){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    username: req.body.username,
    password: hash,
    email: req.body.email,
    picture: req.body.picture
  },function(err,result){
    res.send(result)
  })
}

function login (req,res,next){
  
}

module.exports = {
  createUser,login
}
 