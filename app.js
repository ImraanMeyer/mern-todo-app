const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { port, mongooseURI } = require('./config/config')

const app = express();

// Middlewear
app.use(cors());
app.use(express.json());

// Connecting Mongoose
mongoose.connect(mongooseURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB connected..."));

// Routes
const usersRouter = require('./controller/users');
const todosRouter = require('./controller/todos')

app.use(usersRouter)
app.use('/todos', todosRouter)


// Establishing Port
app.listen(port, () => console.log(`fun @ port: ${port}`))