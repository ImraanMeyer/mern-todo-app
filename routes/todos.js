const express = require('express');
const router = express.Router();

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { getUserTodos, addTodo, removeTodo, editTodo, getSpecificTodo } = require('../controllers/todos');
const { todoValidator } = require('../validators/todos');
const { runValidation } = require('../validators');


router.get('/todos/:id', requireSignin, getSpecificTodo);
router.get('/todos', requireSignin, getUserTodos);
router.post('/todos/new', todoValidator, runValidation,requireSignin, addTodo);
router.delete('/todos/remove/:id', requireSignin, removeTodo);
router.put('/todos/edit/:id', requireSignin, editTodo);

module.exports = router