import * as types from '../actions/actionsTypes';
import initialState from './initialState';

function actionTypeEndsWithSuccess(type) {
  const actionEnd = type.substring(type.length - 7);
  return actionEnd === 'SUCCESS' || actionEnd === 'FAILURE';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypeEndsWithSuccess(action.type)) {
    return state - 1;
  }

  return state;
}
