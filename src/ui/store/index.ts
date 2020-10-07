import { applyMiddleware, combineReducers, createStore } from 'redux';
import { cards, settings, view } from '@/ui/store/reducers';
import { useLocalStorageMiddleware } from '@/ui/store/middleware';

export default function() {
  const rootReducer = combineReducers({ cards, settings, view });
  
  return createStore(rootReducer, applyMiddleware(useLocalStorageMiddleware()));
};
