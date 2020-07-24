const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');

// @route   GET api/tasks
// @desc    Get all of a users tasks
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/tasks/:id
// @desc    Get a specific tasks
// @access  private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ user: req.user.id, _id: req.params.id });

    if (task.length < 1) res.status(404).json({ msg: 'No task found' });

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      startDate,
      isRepeating,
      repeatOccurence,
    } = req.body;

    // Build an object containing task information.
    const buildTask = {};
    buildTask.user = req.user.id;
    if (name) buildTask.name = name;
    if (description) buildTask.description = description;
    if (startDate) buildTask.startDate = startDate;
    if (isRepeating) buildTask.isRepeating = isRepeating;
    if (repeatOccurence) buildTask.repeatOccurence = repeatOccurence;

    try {
      const newTask = new Task(buildTask);

      const task = await newTask.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/tasks/:id
// @desc    Edit a task
// @access  private
router.put(
  '/:id',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      startDate,
      isRepeating,
      repeatOccurence,
      streak,
    } = req.body;

    // Build an object containing task information.
    const buildTask = {};
    buildTask.user = req.user.id;
    if (name != null) buildTask.name = name;
    if (description != null) buildTask.description = description;
    if (startDate != null) buildTask.startDate = startDate;
    if (isRepeating != null) buildTask.isRepeating = isRepeating;
    if (repeatOccurence != null) buildTask.repeatOccurence = repeatOccurence;
    if (streak != null) buildTask.streak = streak;

    try {
      let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

      if (!task) {
        return res.status(404).json({ msg: 'No task found.' });
      }

      // Update the task if one is found
      task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { $set: buildTask },
        { new: true }
      );

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();

    res.json({ msg: 'Task Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
