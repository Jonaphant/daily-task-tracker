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
import moment from 'moment';

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
      let active = checkIfActive(task);

      // @todo Check if streak is broken

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
function checkIfActive(task) {
  const today = new Date();
  const startDate = new Date(task.startDate);

  if (today >= startDate) {
    // Make task active if the date falls within its repeat cycle
    if (task.isRepeating) {
      let daysAfterStart = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24)
      );

      if (daysAfterStart % task.repeatOccurence === 0) {
        return true;
      }
    } else {
      return true;
    }
  }

  return false;
}
