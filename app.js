const express = require('express');

const app = express();

app.use('/api/v1/main', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      person: 'John Jenkins',
      id: 2,
      age: 25,
      color: 'white',
      party: 'Respublican'
    }
  });
});

module.exports = app;
