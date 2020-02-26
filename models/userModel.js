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
    enum: ['user', 'editor', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, `Please add password. This field can't be empty `],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same!'
    }
  },
  accountCreatedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  activeAccount: {
    type: Boolean,
    default: true,
    select: true
  }
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

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ activeAccount: { $ne: false } });
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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
