const express = require('express');
const router = express.Router();

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { getUserTodos, addTodo, removeTodo } = require('../controllers/todos');


router.get('/todos/:id', requireSignin, getUserTodos);
router.post('/todos/new/:id', addTodo);
router.delete('/todos/remove/:id/:todo', removeTodo);


module.exports = router