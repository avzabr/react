import * as types from './actionsTypes';
import courseApi from '../api/mockCoursesApi';
import {beginAjaxCall} from './ajaxStatusActions';

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
  };
}

export const loadCourses = () => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch((error) => {
      throw(error);
    });
  };
};

function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

function saveCourseFailure() {
  return {
    type: types.SAVE_COURSE_FAILURE
  };
}

export const saveCourse = (updatedCourse) => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(updatedCourse).then((savedCourse) => {
      updatedCourse.id ?
        dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch((error) => {
      dispatch(saveCourseFailure(error));
      throw(error);
    });
  };
};
