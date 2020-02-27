const PersonVote = require('../models/personVoteModel.js');
const TESTPersonVote = require('../models/testVoteModel');
const AppError = require('./../utils/appError.js');
const catchAsyncError = require('./../utils/catchAsyncError.js');
const factoryHandler = require('../utils/handlerFactory.js');

// exports.getAllVotes = factoryHandler.getAll(PersonVote);
exports.getAllVotes = factoryHandler.getAll(TESTPersonVote);
exports.createVote = factoryHandler.createOne(PersonVote);
