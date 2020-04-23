const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');
const path = require('path')


require('dotenv').config()

// Initialize Express
const app = express();

// Connect to db
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB connected ...'))
    .catch(err => console.log('DB CONNECTION ERROR', err))

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const todosRoutes = require('./routes/todos');

// App Middlewear
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors()); // allows all origins
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
// }


// Routes Middlewear
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', todosRoutes);

app.use(compression());

// app.use('/api', createProxyMiddleware({
//     target: 'http://localhost:8000',
//     changeOrigin: true
// }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running @ http://localhost:${PORT}`));