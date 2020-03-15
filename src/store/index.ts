import { applyMiddleware, combineReducers, createStore } from 'redux';
import { cards, settings, view } from '@/store/reducers';
import { useLocalStorageMiddleware } from '@/store/middleware';

export default function() {
  const rootReducer = combineReducers({ cards, settings, view });
  
  return createStore(rootReducer, applyMiddleware(useLocalStorageMiddleware()));
};
