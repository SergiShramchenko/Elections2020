const APIFeatures = require('./../utils/apiFeatures.js');
const AppError = require('./../utils/appError.js');
const catchAsyncError = require('./../utils/catchAsyncError.js');

// STATS PART //

exports.getTotalPeopleBetweenAge = (fromAge, toAge, Model) =>
  catchAsyncError(async (req, res, next) => {
    if (fromAge >= '65' && toAge === 'undefined') {
      const stats = await Model.aggregate([
        {
          $match: {
            age: {
              $gte: fromAge
            }
          }
        }
      ]);
      const statsCount = await stats.length;

      res.status(200).json({
        status: 'success',
        data: {
          totalResults: statsCount,
          stats
        }
      });
    } else {
      const stats = await Model.aggregate([
        {
          $match: {
            age: {
              $gte: fromAge,
              $lte: toAge
            }
          }
        }
      ]);

      const statsCount = await stats.length;
      res.status(200).json({
        status: 'success',
        data: {
          totalResults: statsCount,
          stats
        }
      });
    }
  });

exports.findPartyByName = (partyName, Model) =>
  Model.find({
    party: partyName
  });

exports.partyResult = (partyName, totalVotes) =>
  ((partyName.length / totalVotes) * 100).toFixed(3);

exports.totalVotes = Model => Model.countDocuments({});

// const allParties = [
//     'Democratic',
//     'Republican',
//     'Libertarian',
//     'Green',
//     'Other',
//     'Independent',
//     'Constitution'
//   ];
