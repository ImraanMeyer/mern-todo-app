const User = require('../models/User');

const getUserTodos = (req, res) => {
    const userId = req.params.id;

    User.findById(userId).exec((err, user) => {
        const { todos } = user;

        if (err) {
            return res.status(401).json({
                error: 'Failed to fetch todos'
            })
        }

        return res.status(201).json(todos)
    })
}

const addTodo = (req, res) => {
    const userId = req.params.id;
    const { todo } = req.body;

    User.findById(userId).exec((err, user) => {
        const { todos } = user;
        if (err) {
            return res.json(401).json({
                error: 'Failed to add todo'
            })
        }

        todos.push(todo)

        user.save()
        return res.status(201).json(user)

    })
}

const removeTodo = (req, res) => {
    const { userId, todo } = req.params;

    User.findById(userId).exec((err, user) => {
        const { todos } = user;

        const Todos = todos.filter(t => t !== todo);

        console.log(Todos)

    })


}

module.exports = {
    getUserTodos,
    addTodo,
    removeTodo
}