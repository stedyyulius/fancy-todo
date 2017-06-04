const Todos = require('../Models/todo.js')
const jwt = require('jsonwebtoken')
const Storage = require('dom-storage')
const localStorage = new Storage ('./db.json',{strict: false,ws:' '})
const Token = localStorage.getItem('token')
require('dotenv').config()

function createTodo (req,res,next){
  let user = jwt.verivy(Token,SECRET)
  Todos.create({
    task: req.body.task,
    status: 'Not Completed',
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
  let user = jwt.verify(Token,SECRET)
  Todos.find({
    user_id: user._id
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