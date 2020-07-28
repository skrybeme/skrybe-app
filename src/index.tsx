import App from '@/ui/components/App';
import createStore from '@/ui/store';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const store = createStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
