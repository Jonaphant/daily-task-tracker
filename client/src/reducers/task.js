import { CREATE_TASK } from '../actions/types';

const initialState = {
  tasks: [],
  task: null,
  loading: true,
  //   error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    default:
      return state;
  }
}
