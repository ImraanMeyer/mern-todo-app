const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    todo: {
        type: String,
        min: 3
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('Todo', todoSchema);