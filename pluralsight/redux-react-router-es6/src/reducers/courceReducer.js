import {
  CREATE_COURCE,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS
} from '../actions/actionsTypes';
import initialState from './initialState';

const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case CREATE_COURCE: {
      return [...state, action.course];
    }
    case LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    case CREATE_COURSE_SUCCESS: {
      return [...state, Object.assign({}, action.course)];
    }
    case UPDATE_COURSE_SUCCESS: {
      const index = state.findIndex((course) => {
        return course.id === action.course.id;
      });
      return [
        ...state.slice(0, index),
        action.item,
        ...state.slice(index)
      ];
    }
    default:
      return state;
  }
};

export default courseReducer;
