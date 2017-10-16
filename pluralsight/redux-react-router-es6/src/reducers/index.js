import {combineReducers} from 'redux';
import courses from './courceReducer';
import authors from './authorReducer';

const reducer = combineReducers({
  courses,
  authors
});

export default reducer;
