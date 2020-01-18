import Nav from '@/components/Nav';
import Toolbar from '@/components/Toolbar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';
import theme from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme.purple}>
      <Styles.App>
        <Toolbar />
        <Nav />
      </Styles.App>
    </ThemeProvider>
  );
}

export default App;
