import styled from 'styled-components';

export const Item = styled.div<any>`
  width: 100%;
  height: 30px;
  z-index: 1;
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    background-color: ${props => props.theme.bg};
    transition: all 0.1s ease-in-out;
    transform-origin: 50% 50%;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    z-index: -1;
    position: absolute;

    ${props => props.isActive && `
      background-color: ${props.theme.primaryDark};
      transform: scale(1.1);
    `}
  }

  &:hover {
    &:before {
      background-color: ${props => props.theme.primary};
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

export const Context = styled.div`
  padding: 20px 24px;
  font-size: 1.5rem;
  font-weight: 500;
  min-width: 240px;
`;
