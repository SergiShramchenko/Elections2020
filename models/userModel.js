const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      `Please add your name. We can't continue without your name `
    ]
  },
  secondName: {
    type: String,
    required: [
      true,
      `Please add your second name. We can't continue without your second name`
    ]
  },
  email: {
    type: String,
    required: [true, 'Please add your email address'],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      'Email address is not correct. Please provide correct email address'
    ]
  },
  status: {
    type: String,
    role: ['user', 'editor', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, `Please add password. This field can't be empty `],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  },
  accountCreatedAt: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordConfirm = Date.now() - 1000;
  next();
});

userSchema.methods.isPasswordCorrect = async function(
  tryPassword,
  userPassword
) {
  return await bcrypt.compare(tryPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.changedPassworResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
