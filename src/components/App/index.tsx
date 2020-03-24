import DetailedView from '@/components/DetailedView';
import EditableView from '@/components/EditableView';
import PageView from '@/components/PageView';
import WideView from '@/components/WideView';
import Toolbar from '@/components/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import * as S from './styles';
import theme from '@/styles/theme';

function App() {
  const currentView = useSelector(state => state.view);
  const currentTheme = useSelector(state => state.settings.theme);
  const currentThemeObject = theme[currentTheme];

  return (
    <ThemeProvider theme={currentThemeObject}>
      <S.App>
        <Toolbar />
        {currentView === 'wide-view' && <WideView />}
        {currentView === 'page-view' && <PageView />}
      </S.App>
    </ThemeProvider>
  );
}

export default App;
