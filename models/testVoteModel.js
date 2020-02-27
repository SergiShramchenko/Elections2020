const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true],
    unique: [true, 'Id field should be unique']
  },
  state: {
    type: String,
    required: [true]
  },
  party: {
    type: String,
    required: [true]
  },
  ethnicity: {
    type: String,
    required: [true]
  },
  gender: {
    type: String,
    required: [true]
  },
  age: {
    type: String,
    required: [true]
  }
});

const TESTVoteModel = mongoose.model('TESTVoteModel', personSchema);

module.exports = TESTVoteModel;
