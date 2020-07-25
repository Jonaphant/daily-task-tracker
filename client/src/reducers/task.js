import {
  CREATE_TASK,
  CLEAR_TASKS,
  GET_TASKS,
  GET_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TASK_ERROR,
  RESET_TASK_LOAD,
} from '../actions/types';

const initialState = {
  tasks: [],
  task: null,
  loadingTasks: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASK:
      // Upating task only if they are different to stop useEffect from looping on every "change".
      if (JSON.stringify(state.task) === JSON.stringify(payload)) {
        return { ...state, loadingTasks: false };
      } else {
        return {
          ...state,
          task: payload,
          loadingTasks: false,
        };
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loadingTasks: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loadingTasks: false,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id
            ? {
                ...task,
                name: payload.name,
                description: payload.description,
                startDate: payload.startDate,
                streak: payload.streak,
                isRepeating: payload.isRepeating,
                repeatOccurence: payload.repeatOccurence,
                isCompleted: payload.isCompleted,
              }
            : task
        ),
        task: payload,
        loadingTasks: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        task: [],
        loadingTasks: false,
      };
    case RESET_TASK_LOAD:
      return {
        ...state,
        loadingTasks: true,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loadingTasks: false,
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
        task: null,
        loadingTasks: false,
      };
    default:
      return state;
  }
}
