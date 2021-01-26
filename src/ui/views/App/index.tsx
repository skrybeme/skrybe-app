import React from 'react';
import { Toolbar } from '@/ui/views/Toolbar';
import { TreeDetails } from '@/ui/views/TreeDetails';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '@/ui/styles/theme';
import * as S from './styles';
import { ModalProvider } from '@/ui/providers';

export function App() {
  const currentTheme = useSelector(state => state.settings.theme);
  const currentThemeObject = theme[currentTheme];

  return (
    <ThemeProvider theme={currentThemeObject}>
      <ModalProvider>
        <S.App>
          <Toolbar />
          <S.Workspace>
            <TreeDetails />
          </S.Workspace>
        </S.App>
      </ModalProvider>
    </ThemeProvider>
  );
}
