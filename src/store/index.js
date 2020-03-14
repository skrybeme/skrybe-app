import { combineReducers, createStore } from 'redux';
import { settings, view } from '@/store/reducers';

export default function() {
  const rootReducer = combineReducers({ settings, view });
  
  return createStore(rootReducer);
};
