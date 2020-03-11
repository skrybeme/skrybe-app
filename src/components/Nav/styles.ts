import styled from 'styled-components';

export const Context = styled.nav`
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
  background-color: ${props => props.theme.primary};
  width: 320px;
  height: 100%;
  left: 0;
  z-index: 699;
  position: absolute;

  &:before {
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: -1px;
    position: absolute;
  }

  &:after {
    transition: 0.1s;
    content: '';
    background-color: ${props => props.theme.primaryLight};
    top: calc(50%);
    right: -5px;
    width: 2px;
    height: 80px;
    opacity: 1;
    font-size: 21px;
    position: absolute;
  }

  &:hover {
    opacity: 1;
    transform: none;

    &:before,
    &:after {
      opacity: 0;
    }
  }
`;
