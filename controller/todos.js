const router = require('express').Router();
const Todo = require('../model/todos.model');
const auth = require('../middlewear/auth');

// Get Todos
router.route('/').get(auth, async (req, res) => {
    try {
        await Todo.find()
            // .then(todos => res.json(todos))
            .then(todos => res.json(todos.filter(todo => todo.username === req.user.name)))
            .catch(err => res.status(400).json(`Error: ${err}`))
    } catch (error) {
        console.log(error)
    }
})

// Post new todo
router.route('/new').post((req, res) => {
    const newTodo = new Todo({ todo: req.body.todo })

    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => console.log(err))
})

// Delete todo
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(id => res.json(id))
        .catch(err => res.status(400).json(`Error: ${err}`));
})


module.exports = router;
