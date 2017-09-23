import * as actions from './actionsConstants';

export const createCourse = (course) => {
  return {
    type: actions.CREATE_COURCE,
    course
  };
};
