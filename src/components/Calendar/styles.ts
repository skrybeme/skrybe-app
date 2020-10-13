import styled from 'styled-components';

export const Ball = styled.span<any>`
  background-color: ${props => props.theme.primaryLight};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: ${props => props.opacity || 0}
`;

export const Context = styled.div`
  padding: 10px 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  display: grid;
  justify-content: start;
`;
