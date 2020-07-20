import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  EDIT_TASK,
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
    dispatch({
      type: GET_TASKS,
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

// Create Task
export const createTask = ({
  name,
  description,
  isRepeating,
  repeatOccurence,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    description,
    isRepeating,
    repeatOccurence,
  });

  try {
    const res = await axios.post('/api/tasks', body, config);

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
export const editTask = ({
  taskId,
  name,
  description,
  isRepeating,
  repeatOccurence,
  streak,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    description,
    isRepeating,
    repeatOccurence,
    streak,
  });

  try {
    const res = await axios.put(`/api/tasks/${taskId}`, body, config);

    dispatch({
      type: EDIT_TASK,
      payload: res.data,
    });

    dispatch(setAlert('Task saved', 'success'));
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
