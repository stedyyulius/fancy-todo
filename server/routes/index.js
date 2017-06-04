var express = require('express');
var router = express.Router();
const todoController = require('../Controllers/todo-controller.js')
const userController = require('../Controllers/user-controller.js')
/* GET home page. */
router.get('/todos',todoController.allTodos)
router.get('/todo',todoController.listTodo)
router.get('/todo/:id',todoController.searchTodo)
router.post('/todo',todoController.createTodo)
router.post('/todo/:id',todoController.updateTodo)
router.delete('/todo/:id',todoController.deleteTodo)

module.exports = router;
