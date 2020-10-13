import { MouseEventHandler } from '@/common/types';
import { flex } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';

export const CardTeaser = styled.div<{ onClick: MouseEventHandler }>`${({ theme }) => css`
  background-color: ${theme.bgLight};
  border-radius: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  height: 120px;
  margin: 5px 10px;
  position: relative;
  width: 200px;

  &:hover {
    background-color: ${theme.bgLightHover};
  }
`}`;

export const Header = styled.div`
  font-size: 1.6rem;
  padding: 12px 16px;
  user-select: none;
`;

export const TagLine = styled.div`
  ${flex};
  bottom: 0;
  left: 0;
  padding: 0 13px;
  position: absolute;
  right: 0;
`;

export const Tag = styled.div`${({ color }) => css`
  background-color: ${color || `lightgray`};
  height: 10px;
  width: 100%;
  margin: 8px 3px 14px;
`}`;
