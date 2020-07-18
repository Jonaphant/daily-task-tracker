import {
  CREATE_TASK,
  CLEAR_TASKS,
  GET_TASKS,
  TASK_ERROR,
} from '../actions/types';

const initialState = {
  tasks: [],
  task: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
        task: null,
        loading: false,
      };
    default:
      return state;
  }
}
