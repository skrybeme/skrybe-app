import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { settings } from '@/store/reducers';

export default function() {
  const rootReducer = combineReducers({ settings });
  
  return createStore(rootReducer);
};
