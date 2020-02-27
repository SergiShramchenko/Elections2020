const PersonVote = require('../models/personVoteModel');
const TESTPersonVote = require('../models/testVoteModel');
const AppError = require('./../utils/appError.js');
const catchAsyncError = require('./../utils/catchAsyncError.js');
const {
  getTotalPeopleBetweenAge,
  findPartyByName,
  partyResult,
  totalVotes
} = require('../utils/statsHandlerFactory');

// AGE //

exports.getTotalPeopleBetween18To24 = getTotalPeopleBetweenAge(
  '18',
  '24',
  PersonVote
);
exports.getTotalPeopleBetween25To34 = getTotalPeopleBetweenAge(
  '25',
  '34',
  PersonVote
);
exports.getTotalPeopleBetween35To44 = getTotalPeopleBetweenAge(
  '35',
  '44',
  PersonVote
);
exports.getTotalPeopleBetween45To54 = getTotalPeopleBetweenAge(
  '45',
  '54',
  PersonVote
);
exports.getTotalPeopleBetween55To64 = getTotalPeopleBetweenAge(
  '55',
  '64',
  PersonVote
);
exports.getTotalPeopleBetween65plus = getTotalPeopleBetweenAge(
  '65',
  'undefined',
  PersonVote
);

// VOTES PER PARTY //

exports.getTotalVotesPerParty = catchAsyncError(async (req, res, next) => {
  const totalRes = await totalVotes(PersonVote);

  const partyDemWhite = await findPartyByName(
    'Democratic',
    PersonVote.find({ ethnicity: 'white' })
  );
  const partyDemBlack = await findPartyByName(
    'Democratic',
    PersonVote.find({ ethnicity: 'black' })
  );
  const partyRepWhite = await findPartyByName(
    'Republican',
    PersonVote.find({ ethnicity: 'white' })
  );
  const partyRepBlack = await findPartyByName(
    'Republican',
    PersonVote.find({ ethnicity: 'black' })
  );

  const partyDem = await findPartyByName('Democratic', PersonVote);
  const partyRep = await findPartyByName('Republican', PersonVote);
  const partyLib = await findPartyByName('Libertarian', PersonVote);
  const partyGrn = await findPartyByName('Green', PersonVote);
  const partyOther = await findPartyByName('Other', PersonVote);
  const partyInd = await findPartyByName('Independent', PersonVote);
  const partyCon = await findPartyByName('Constitution', PersonVote);

  const partyDemTotalResults = partyResult(partyDem, totalRes);
  const partyRepTotalResults = partyResult(partyRep, totalRes);
  const partyLibTotalResults = partyResult(partyLib, totalRes);
  const partyGrnTotalResults = partyResult(partyGrn, totalRes);
  const partyIndTotalResults = partyResult(partyOther, totalRes);
  const partyConTotalResults = partyResult(partyInd, totalRes);
  const partyOthTotalResults = partyResult(partyCon, totalRes);

  res.status(200).json({
    status: 'success',
    partyDemTotalResults,
    whiteDem: partyDemWhite.length,
    blackDem: partyDemBlack.length,
    partyRepTotalResults,
    whiteRep: partyRepWhite.length,
    blackRep: partyRepBlack.length,
    partyLibTotalResults,
    partyGrnTotalResults,
    partyIndTotalResults,
    partyConTotalResults,
    partyOthTotalResults
  });
});
