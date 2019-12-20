import { createStore } from 'redux';
import Reducer from './reducers/AuthReducer';

const store = createStore(Reducer)

export default store;
