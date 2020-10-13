import styled from 'styled-components';

export const Panel = styled.div<any>`
  padding: 0 20px;
  font-size: 15px;
  height: 0;
  overflow: hidden;

  ${props => props.isExtended && `
    padding-top: 10px;
    padding-bottom: 10px;
    height: auto;
  `}
`;

export const Context = styled.div``;
