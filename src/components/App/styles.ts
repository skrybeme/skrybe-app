import styled from 'styled-components';

export const App = styled.div`
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.default};
  padding: 0;
  height: 100%;

  *::selection {
    background-color: ${props => props.theme.primaryLight};
    color: ${props => props.theme.light};
  }
`;
