const User = require('../models/User');
const Todo = require('../models/Todo');


const getSpecificTodo = (req,res) => {
    const id = req.params.id;

    Todo.findById(id).exec((err, todo) => {
        if (err) {
            return res.status(401).json({
                'error': 'Failed to fetch the todo'
            })
        }

        return res.status(201).json(todo)
    })
}


const getUserTodos = (req, res) => {
    const user = req.user._id;

    Todo.find().exec((err, todos) => {
        if (err) {
            return res.status(401).json({
                'error': 'Failed to fetch todos'
            })
        }

        let userTodos = []

        todos.forEach(todo => {
            if (todo.user == user) {
                userTodos.push(todo)
            }
        })


        return res.status(201).json({
            'todos': userTodos
        })
    })
}

const addTodo = (req, res) => {
    const { todo } = req.body;
    const user = req.user._id;

    if (!todo) {
        return res.status(400).json({
            'error': 'Please insert a valid todo'
        })
    }

    const newTodo = new Todo({ user, todo });

    newTodo.save((err, todo) => {
        if (err) {
            return res.status(401).json({
                error: 'Failed to add todo'
            })
        }

        return res.status(201).json({
            todo,
            message: 'Todo added sucesfully!'
        })
    })
}

const removeTodo = (req, res) => {
    const todoId = req.params.id;

    Todo.findByIdAndDelete(todoId).exec((err, data) => {
        if (err) {
            return res.status(401).json({
                error: 'Sorry, a todo with that ID does not exist'
            })
        }

        return res.status(203).json({
            'message': 'Todo removed succesfully'
        })
    })
}

const editTodo = (req, res) => {
    const todoId = req.params.id;
    const { todo } = req.body;

    Todo.findByIdAndUpdate(todoId).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                'error': 'Todo not found'
            })
        }

        if (todo) data.todo = todo;

        data.save((err, updatedTodo) => {
            if (err) {
                return res.status(400).json({
                    'error': 'Failed to updated todo'
                })
            }

            res.json({
                updatedTodo,
                "message": 'Todo updated succesfully'
            })
        })
    })
}

module.exports = {
    getUserTodos,
    addTodo,
    removeTodo,
    editTodo,
    getSpecificTodo
}