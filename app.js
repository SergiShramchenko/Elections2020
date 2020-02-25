const express = require('express');

const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE //

// Body parser, reading data from the body into req.body
app.use(express.json());

// ROUTES //
app.use('/api/v1/users', userRouter);

module.exports = app;
