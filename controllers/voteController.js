const PersonVote = require('../models/personVoteModel.js');
const AppError = require('./../utils/appError.js');
const catchAsyncError = require('./../utils/catchAsyncError.js');
const factoryHandler = require('../utils/handlerFactory.js');

exports.getAllVotes = factoryHandler.getAll(PersonVote);
exports.createVote = factoryHandler.createOne(PersonVote);
