import { Nav } from '@/ui/components/Nav/styles';
import { px, Space } from '@/ui/styles/spacing';
import styled, { createGlobalStyle } from 'styled-components';

export const App = styled.div`
  background-color: #5E489D;
  color: ${props => props.theme.default};
  padding: 0;
  height: 100%;

  *::selection {
    background-color: ${props => props.theme.primaryLight};
    color: ${props => props.theme.light};
  }

  ${Nav} {
    top: 48px;
    z-index: 1;
  }
`;

export const Workspace = styled.div`
  height: calc(100% - ${px(Space.XXL)});
  margin-top: ${px(Space.XXL)};
  position: relative;
  width: 100%;
`;
