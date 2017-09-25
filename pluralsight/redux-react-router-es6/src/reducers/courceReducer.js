import {CREATE_COURCE, LOAD_COURSES_SUCCESS} from '../actions/actionsTypes';

const courseReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_COURCE: {
      return [...state, action.course];
    }
    case LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    default:
      return state;
  }
};

export default courseReducer;
