const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.get('/information', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'It works!'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.name
    });
  }
});

router.patch('/updateMyPassword', updatePassword);

module.exports = router;
