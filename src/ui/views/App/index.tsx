import React from 'react';
import { Toolbar } from '@/ui/views/Toolbar';
import { TreeDetails } from '@/ui/views/TreeDetails';
import { ThemeProvider } from 'styled-components';
import { Themes } from '@/ui/styles/theme';
import * as S from './styles';
import { ModalProvider } from '@/ui/providers';

export function App() {
  return (
    <ThemeProvider theme={Themes.purple}>
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
