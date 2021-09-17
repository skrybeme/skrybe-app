import { ButtonProps } from '@/interfaces/props';
import { borderCircle } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const Button = styled.button<Omit<ButtonProps, 'onClick'>>`${({
  muted,
  rounded,
  upper,
  variant
}) => css`
  align-items: center;
  border: 0;
  color: #000;
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  font-weight: 600;
  height: 34px;
  justify-content: center;
  min-width: 32px;
  padding: ${px(Space.S)} ${px(Space.L)};
  position: relative;

  &:hover {
      background-color: #e5e5e5;
    }

  ${muted && css`
    color: lightgray;
  `};

  ${rounded && css`
    border-radius: 3px;
  `};

  ${upper && css`
    text-transform: uppercase;
  `};

  ${variant === 'primary' && css`
    background-color: #5E489D;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  `};
`}`;
