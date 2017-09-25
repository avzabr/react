import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const initialState = undefined;
let store = createStore(rootReducer, initialState, applyMiddleware(thunk, immutableStateInvariantMiddleware()));

export default store;

