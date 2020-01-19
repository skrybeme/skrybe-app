import WideView from '@/components/WideView';
import Nav from '@/components/Nav';
import Toolbar from '@/components/Toolbar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';
import theme from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme.sea}>
      <Styles.App>
        <Toolbar />
        <Nav />
        <WideView />
      </Styles.App>
    </ThemeProvider>
  );
}

export default App;
