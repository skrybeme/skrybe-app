import styled from 'styled-components';

export const App = styled.div`
  background-color: #5E489D;
  color: ${props => props.theme.default};
  padding: 0;
  height: 100%;

  *::selection {
    background-color: ${props => props.theme.primaryLight};
    color: ${props => props.theme.light};
  }
`;

export const Workspace = styled.div`
  height: 100%;
  padding-top: 74px;
  position: relative;
  width: 100%;
`;
