const Users = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const Storage = require('dom-storage')
const localStorage = new Storage ('./db.json',{strict: false,ws:' '})
const Token = localStorage.getItem('token')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
require('dotenv').config()

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
  Users.findOne({
    username: req.body.username || req.body.name
  },function(err,result){
    if(result === null){
      Users.create({
        username: req.body.name,
        picture: ""
      },function(err,result){
        var token = jwt.sign({_id:result._id,username:result.username,picture:result.picture},process.env.SECRET)
        localStorage.setItem('token',token)
        var user = jwt.verify(token,process.env.SECRET)
        res.send(user)
      })
    }
    else{
      if(bcrypt.compare(req.body.password,result.password)){
        var token = jwt.sign({_id:result._id,username:result.username,picture:result.picture},process.env.SECRET)
        localStorage.setItem('token',token)
        var user = jwt.verify(token,process.env.SECRET)
        var tmp = {
          _id: result._id,
          username: result.username,
          picture: result.picture
        }
        res.send(user)
      }
      else{
        res.send('invalid Password!')
      }
    }
  })
}

function listUsers (req,res,next){
  Users.find({},function(err,result){
    res.send(result)
  })
}

function editUser (req,res,next){
  Users.findOne({
    _id:req.params.id
  },function(err,result){
    Users.updateOne({
      _id:req.params.id
    },{
      username: req.body.username || result.username,
      password: req.body.password || result.password,
      email: req.body.email || result.email,
      picture: req.body.picture || result.picture
    },function(err,result){
      res.send(`${result.username} Updated!`)
    })
  })
}

function deleteUser (req,res,next){
  Users.remove({
    _id:req.params.id
  },function(err,result){
    res.send(`Delete Success!`)
  })
}

function getUser (req,res,next){
  Users.findOne({
    _id:req.params.id
  },function(err,result){
    res.send(result)
  })
}

function logout(req,res,next){
  localStorage.clear()
}

module.exports = {
  createUser,login,deleteUser,editUser,getUser,listUsers,logout
}
 