import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TASK_ERROR,
  RESET_TASK_LOAD,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

//Get task by id
export const getTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tasks/${id}`);

    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tasks');

    // Map through res data to add active property
    const tasks = res.data.map((task) => {
      let streak = task.streak;
      let completed = task.isCompleted;
      let active = isActive(
        task.startDate,
        task.repeatOccurence,
        task.isRepeating
      );

      // Check if isComplete
      if (task.isCompleted) {
        completed = isCompletedCheck(task);
      }

      // Check if streak is broken
      if (task.streakDate) {
        if (isStreakBroken(task)) {
          streak = 0;
        }
      }

      // Update task with new streak and isCompleted
      if (streak !== task.streak || completed !== task.isCompleted) {
        dispatch(
          editTask(task._id, {
            ...task,
            streak: streak,
            isCompleted: completed,
          })
        );

        return {
          ...task,
          active: active,
          streak: streak,
          isCompleted: completed,
        };
      }

      return { ...task, active: active };
    });

    dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Task
export const createTask = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      '/api/tasks',
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });

    dispatch(setAlert('Task Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Task
export const editTask = (taskId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      `/api/tasks/${taskId}`,
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: EDIT_TASK,
      payload: res.data,
    });

    dispatch(setAlert('Task Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete task
export const deleteTask = (id, completed = false) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    if (completed) {
      dispatch(setAlert('Task Completed', 'success'));
    } else {
      dispatch(setAlert(res.data.msg, 'success'));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Reset loading state
export const resetLoading = () => (dispatch) => {
  dispatch({ type: RESET_TASK_LOAD });
};

// HELPER FUNCTIONS

// Calculation dates to determine if task is active
function isActive(taskStartDate, repeatOccurence, isRepeating) {
  const today = new Date();
  const startDate = new Date(taskStartDate);

  if (today >= startDate) {
    // Make task active if the date falls within its repeat cycle
    if (isRepeating) {
      let daysAfterStart = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
      );

      return daysAfterStart % repeatOccurence === 0;
    } else {
      return true;
    }
  }

  return false;
}

function isStreakBroken(task) {
  let potentialStreaks = calcPotentialStreaks(
    task.streakDate,
    task.repeatOccurence
  );

  return potentialStreaks - task.streak >= 2;
}

function isCompletedCheck(task) {
  let potentialStreaks = calcPotentialStreaks(
    task.streakDate,
    task.repeatOccurence
  );

  if (potentialStreaks > task.streak) {
    return false;
  }

  return task.isCompleted;
}

function calcPotentialStreaks(taskStreakDate, repeatOccurence) {
  const today = new Date().setDate();
  const streakDate = new Date(taskStreakDate);
  const firstDayOffset = 1;

  // Calculate days that have passed after streak date
  const daysAfterStreakStart = Math.floor(
    (today - streakDate) / (1000 * 60 * 60 * 24)
  );

  return Math.ceil((daysAfterStreakStart + firstDayOffset) / repeatOccurence);
}
