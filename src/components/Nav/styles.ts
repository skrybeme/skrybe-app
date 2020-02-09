import styled from 'styled-components';

export const Context = styled.nav`
  transition: all 0.2s ease-in-out;
  transform: translateX(-100%);
  background-color: ${props => props.theme.primary};
  width: 360px;
  height: 100%;
  left: 0;
  position: absolute;

  &:before {
    transition: 0.1s;
    content: "\f100";
    color: ${props => props.theme.primaryLight};
    top: 0;
    bottom: 0;
    left: 100%;
    right: -20px;
    position: absolute;
    font-family: "Font Awesome 5 Free";
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 108vh;
    font-weight: 900;
    font-size: 19px;
    padding-left: 15px;
  }

  &:after {
    transition: 0.1s;
    content: '';
    background-color: ${props => props.theme.primaryLight};
    top: calc(50%);
    right: -10px;
    width: 4px;
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
