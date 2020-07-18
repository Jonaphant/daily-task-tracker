import { CREATE_TASK, TASK_ERROR } from './types';
import { setAlert } from './alert';
import axios from 'axios';

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
    });
  }
};
