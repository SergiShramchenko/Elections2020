const express = require('express');

const { protect } = require('../controllers/authController');

const {
  getTotalPeopleBetween18To24,
  getTotalPeopleBetween25To34,
  getTotalPeopleBetween35To44,
  getTotalPeopleBetween45To54,
  getTotalPeopleBetween55To64,
  getTotalPeopleBetween65plus,
  getTotalVotesPerParty
} = require('../controllers/voteStatsController');

const router = express.Router();

router.get('/getTotalPeopleBetween18To24', getTotalPeopleBetween18To24);
router.get('/getTotalPeopleBetween25To34', getTotalPeopleBetween25To34);
router.get('/getTotalPeopleBetween35To44', getTotalPeopleBetween35To44);
router.get('/getTotalPeopleBetween45To54', getTotalPeopleBetween45To54);
router.get('/getTotalPeopleBetween55To64', getTotalPeopleBetween55To64);
router.get('/getTotalPeopleBetween65plus', getTotalPeopleBetween65plus);

router.get('/getTotalVotesPerParty', getTotalVotesPerParty);

module.exports = router;
