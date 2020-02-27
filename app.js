const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const userRouter = require('./routes/userRoutes');
const voteRouter = require('./routes/voteRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARE //

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Try again later'
});

app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '100kb' }));

app.use(mongoSanitize());

app.use(xss());

// app.use(hpp({ whitelist: ['price', 'duration'] }));
app.use(hpp());

app.use(express.static(`${__dirname}/public`));

// ROUTES //
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vote', voteRouter);

// GLOBAL ERROR HANDLER //
app.use(globalErrorHandler);

module.exports = app;
