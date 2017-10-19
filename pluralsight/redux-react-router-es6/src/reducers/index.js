import {combineReducers} from 'redux';
import courses from './courceReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReduser';

const reducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default reducer;
