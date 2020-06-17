const express = require('express');
const router = express.Router();

// @route   GET api/goals
// @desc    Test Route
// @access  public
router.get('/', (req, res) => res.send('Goal route'));

module.exports = router;
