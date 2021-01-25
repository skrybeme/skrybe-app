import { borderCircle } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';

export const Button = styled.button<{ muted: boolean, onClick: any, rounded: boolean, transparent: boolean }>`${({ muted, rounded }) => css`
  align-items: center;
  background-color: white;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  font-size: 15px;
  height: 30px;
  justify-content: center;
  margin: 10px;
  min-width: 30px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  transition: all 0.1s ease-out;

  &:after {
    ${borderCircle()};
    background-color: transparent;
    border: 3px solid #5b3da277;
    bottom: -6px;
    content: '';
    left: -6px;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: -6px;
    top: -6px;
    transform: scale(1.2);
    transition: all 0.1s ease-out;
  }

  &:hover {
    background-color: #5b3da2;
    color: #fff;

    &:after {
      opacity: 1;
      transform: none;
    }
  }

  ${muted && css`
    color: lightgray;
  `};

  ${rounded && css`
    ${borderCircle()};
  `};
`}`;
