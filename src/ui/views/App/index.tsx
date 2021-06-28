import React from 'react';
import { Toolbar } from '@/ui/views/Toolbar';
import { TreeDetails } from '@/ui/views/TreeDetails';
import { ThemeProvider } from 'styled-components';
import { Themes } from '@/ui/styles/theme';
import { ModalProvider } from '@/ui/providers';
import { SidebarProvider } from '@/ui/components/Sidebar/context';
import * as S from './styles';

export function App() {
  return (
    <ThemeProvider theme={Themes.purple}>
      <S.App>
        <ModalProvider>
          <SidebarProvider>
            <Toolbar />
            <S.Workspace>
              <TreeDetails />
            </S.Workspace>
          </SidebarProvider>
        </ModalProvider>
      </S.App>
    </ThemeProvider>
  );
}
