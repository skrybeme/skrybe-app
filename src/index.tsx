import App from '@/ui/components/App';
import createStore from '@/ui/store';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ContainerProvider } from '@/ui/providers';
import { container } from '@/container';

const store = createStore();

render(
  <ContainerProvider container={container}>
    <Provider store={store}>
      <App />
    </Provider>
  </ContainerProvider>,
  document.getElementById('root')
);
