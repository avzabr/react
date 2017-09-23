import {CREATE_COURCE} from '../actions/actionsConstants';

const courseReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_COURCE: {
      return [...state, action.course];
    }
    default:
      return state;
  }
};

export default courseReducer;
