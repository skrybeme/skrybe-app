import { TagColor } from '@/entities/enums';
import { borderRadius } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const TagLine = styled.div`
  display: flex;
`;

interface TagProps {
  color: TagColor;
}

export const Tag = styled.div<TagProps>`${({ color }) => css`
  ${borderRadius()};

  background-color: ${color || `lightgray`};
  height: ${px(Space.M)};
  width: ${px(Space.L)};

  & + & {
    margin-left:  ${px(Space.S)};
  }
`}`;
