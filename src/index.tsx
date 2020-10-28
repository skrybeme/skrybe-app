import React from 'react';
import { App } from '@/ui/views/App';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ContainerProvider } from '@/ui/providers';
import { container } from '@/container';
import createStore from '@/ui/store';

const store = createStore();

render(
  <ContainerProvider container={container}>
    <Provider store={store}>
      <App />
    </Provider>
  </ContainerProvider>,
  document.getElementById('root')
);
