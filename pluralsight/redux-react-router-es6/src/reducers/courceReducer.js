import {CREATE_COURCE, LOAD_COURSES_SUCCESS} from '../actions/actionsTypes';
import initialState from './initialState';

const courseReducer = (state = initialState.courses, action) => {
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
