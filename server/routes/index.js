var express = require('express');
var router = express.Router();
const todoController = require('../Controllers/todo-controller.js')
const userController = require('../Controllers/user-controller.js')
/* GET home page. */
router.get('/todos',todoController.allTodos)
router.get('/todo/:id',todoController.listTodo)
router.get('/Onetodo/:id',todoController.searchTodo)
router.post('/todo',todoController.createTodo)
router.post('/todo/:id',todoController.updateTodo)
router.get('/deleteTodo/:id',todoController.deleteTodo)

router.get('/user', userController.listUsers)
router.get('/user/:id',userController.getUser)
router.post('/user/login',userController.login)
router.post('/user',userController.createUser)
router.post('/user/:id',userController.editUser)
router.get('/deleteUser/:id',userController.deleteUser)
router.get('/user/logout',userController.logout)

module.exports = router;
