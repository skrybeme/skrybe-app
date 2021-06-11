import { TagColor } from '@/entities/enums';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const TagLine = styled.div`
  display: flex;
`;

interface TagProps {
  color: TagColor;
}

export const Tag = styled.div<TagProps>`${({ color }) => css`
  background-color: ${color || `lightgray`};
  border-radius: 50%;
  height: ${px(Space.M)};
  margin-top: ${px(Space.M)};
  width: ${px(Space.M)};

  & + & {
    margin-left:  ${px(Space.S)};
  }
`}`;
