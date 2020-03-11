import DetailedView from '@/components/DetailedView';
import EditableView from '@/components/EditableView';
import PageView from '@/components/PageView';
import WideView from '@/components/WideView';
import Nav from '@/components/Nav';
import Toolbar from '@/components/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import * as Styles from './styles';
import theme from '@/styles/theme';

function App() {
  const currentTheme = useSelector(state => state.settings.theme);
  const currentThemeObject = theme[currentTheme];

  return (
    <ThemeProvider theme={currentThemeObject}>
      <Styles.App>
        <Toolbar />
        <Nav />
        <PageView />
      </Styles.App>
    </ThemeProvider>
  );
}

export default App;
