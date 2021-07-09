import { TagColor } from '@/entities/enums';
import { borderRadius } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import { lighten } from 'polished';
import styled from 'styled-components';

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
  outline: 0;
  width: ${px(Space.XXL)};

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
