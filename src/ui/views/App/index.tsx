import React from 'react';
import { Toolbar } from '@/ui/views/Toolbar';
import { TreeDetails } from '@/ui/views/TreeDetails';
import { ThemeProvider } from 'styled-components';
import { Themes } from '@/ui/styles/theme';
import { ModalProvider } from '@/ui/providers';
import { SidebarProvider } from '@/ui/components/Sidebar/context';
import { Nav } from '@/ui/views/Nav';
import { useToggle } from '@/ui/hooks';
import * as S from './styles';
import * as GS from '@/ui/styles/global';

export function App() {
  const { isOpen, toggle } = useToggle(true);

  return (
    <ThemeProvider theme={Themes.purple}>
      <GS.CssReset />
      <S.App>
        <ModalProvider>
          <SidebarProvider>
            <Toolbar onHamburgerClick={toggle} />
            <S.Workspace>
              <TreeDetails />
            </S.Workspace>
          </SidebarProvider>
        </ModalProvider>
        <Nav isOpen={isOpen} />
      </S.App>
    </ThemeProvider>
  );
}
