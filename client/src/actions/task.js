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
  // Conversion from milliseconds to days
  const msDay = 1000 * 60 * 60 * 24;

  const today = new Date();

  try {
    const res = await axios.get('/api/tasks');

    // Map through res data to add active property
    const tasks = res.data.map((task) => {
      let active = false;
      const startDate = new Date(task.startDate);

      if (today >= startDate) {
        if (task.isRepeating) {
          // Make task active if the take falls within its repeat cycle
          let daysBetweenRepeat = Math.ceil((startDate - today) / msDay);

          if (daysBetweenRepeat % task.repeatOccurence === 0) {
            active = true;
          }
        } else {
          active = true;
        }
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

    dispatch(setAlert('Task Saved', 'success'));
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
