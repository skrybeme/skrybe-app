import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom';
import { Toolbar } from '@/ui/views/Toolbar';
import { TreeDetailsRoute } from '@/ui/views/TreeDetails/route';
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
        <Router basename="/">
          <ModalProvider>
            <SidebarProvider>
              <Toolbar onHamburgerClick={toggle} />
              <S.Workspace>
                <Switch>
                  <Route
                    component={() => <TreeDetailsRoute />}
                    exact
                    path="/:id"
                  />
                  <Route
                    component={() => <TreeDetailsRoute />}
                    exact
                    path="/"
                  />
                </Switch>
              </S.Workspace>
            </SidebarProvider>
          </ModalProvider>
          <Nav isOpen={isOpen} />
        </Router>
      </S.App>
    </ThemeProvider>
  );
}
