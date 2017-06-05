const Todos = require('../Models/todo.js')
const Users = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const Storage = require('dom-storage')
const localStorage = new Storage ('./db.json',{strict: false,ws:' '})
const Token = localStorage.getItem('token')
const moment = require('moment')
require('dotenv').config()

function format_date(date){
  return moment(date).format('dddd, D MMM YYYY, h:mm')
}

function createTodo (req,res,next){
  let user = jwt.verify(Token,process.env.SECRET)
  Todos.create({
    task: req.body.task,
    status: 'Not Complete',
    createdAt: new Date().toUTCString(),
    user_id: user._id
  },function(err,result){
    res.send(result)
  })
}

function updateTodo (req,res,next){
  Todos.findOne({
    _id: req.params.id
  },function(err,result){
    Todos.updateOne({
      _id:req.params.id
    },{
      task: req.body.task || result.task,
      status: req.body.status || result.status,
    },function(err,result){
      res.send(`${result.task} Updated!`)
    })
  })
} 

function searchTodo (req,res,next){
  Todos.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function deleteTodo (req,res,next){
  Todos.remove({
    _id:req.params.id
  },function(err,result){
    res.send('Delete Success!')
  })
}

function listTodo (req,res,next){
  Todos.find({
    user_id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function allTodos (req,res,next){
  Todos.find({},function(err,result){
    res.send(result)
  })
}
module.exports = {
  createTodo,updateTodo,searchTodo,deleteTodo,listTodo,allTodos
}