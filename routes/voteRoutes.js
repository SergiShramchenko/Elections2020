const express = require('express');

const { getAllVotes, createVote } = require('../controllers/voteController');

const {
  protect,
  checkPermission
} = require('../controllers/authController.js');

const router = express.Router();

router
  .route('/')
  .get(getAllVotes)
  .post(protect, checkPermission('user'), createVote);

module.exports = router;
