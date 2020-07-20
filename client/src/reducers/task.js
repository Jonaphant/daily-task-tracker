import {
  CREATE_TASK,
  CLEAR_TASKS,
  GET_TASKS,
  GET_TASK,
  TASK_ERROR,
  RESET_TASK_LOAD,
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
    case GET_TASK:
      if (JSON.stringify(state.task) === JSON.stringify(payload)) {
        console.log('same');
        return { ...state };
      } else {
        return {
          ...state,
          task: payload,
          loading: false,
        };
      }
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
    case RESET_TASK_LOAD:
      return {
        ...state,
        loading: true,
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
