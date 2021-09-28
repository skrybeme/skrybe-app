import styled, { css } from 'styled-components';
import { TagColor } from '@/entities/enums';
import { borderRadius } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import { darken, lighten } from 'polished';

export const EditableTags = styled.div`
  display: flex;
`;

export const TagButton = styled.button<{ color: TagColor }>`
  ${borderRadius()};

  background-color: ${props => props.color};
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px #fff;
  cursor: pointer;
  height: ${px(Space.XL)};
  position: relative;
  outline: 0;
  width: ${px(Space.XXL)};

  ${props => props.color === TagColor.EMPTY && css`
  &:before,
  &:after {
      background-color: ${darken(0.1, props.color)};
      bottom: 4px;
      content: '';
      left: calc(50% - 2px);
      position: absolute;
      right: calc(50% - 2px);
      top: 4px;
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  `};

  &.is-active {
    box-shadow: 0 0 0 4px ${props => props.color};
  }

  &:hover {
    background-color: ${props => props.color && lighten(0.1, props.color)};
  }

  & + & {
    margin-left:  ${px(Space.M)};
  }
`;
