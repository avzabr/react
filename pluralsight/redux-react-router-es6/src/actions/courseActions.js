import * as types from './actionsTypes';
import courseApi from '../api/mockCoursesApi';

export const createCourse = (course) => {
  return {
    type: types.CREATE_COURCE,
    course
  };
};

function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  }
}

export const loadCourses = () => {
  return (dispatch) => {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch((error) => {
      throw(error);
    })
  }
};
