const express = require('express');
const router = express.Router();

// @route   GET api/tasks
// @desc    Test Route
// @access  public
router.get('/', (req, res) => res.send('Task route'));

module.exports = router;
