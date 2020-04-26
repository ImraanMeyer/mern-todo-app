const { check } = require('express-validator');

const todoValidator = [
    check('todo')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('Todo must be at least 3 characters long')
]

module.exports = {
    todoValidator
}