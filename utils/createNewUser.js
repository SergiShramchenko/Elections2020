const User = require('../models/userModel');

module.exports = req =>
  User.create({
    name: req.body.name,
    secondName: req.body.secondName,
    email: req.body.email,
    status: req.body.status,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountCreatedAt: Date.now()
  });
