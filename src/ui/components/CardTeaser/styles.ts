import { MouseEventHandler } from '@/common/types';
import { flex } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';
import { Editable } from '../Editable/styles';

// @TODO
// Handle scaling the better way.
const SCALE = 0.9;

export const CardTeaser = styled.div<{ onClick: MouseEventHandler }>`${({ theme }) => css`
  background-color: ${theme.bgLight};
  border-radius: ${SCALE * 2}px;
  box-shadow: 0px 0px ${SCALE * 10}px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  min-height: ${SCALE * 120}px;
  position: relative;
  width: ${SCALE * 200}px;

  &:hover {
    background-color: ${theme.bgLightHover};
  }
`}`;

export const Header = styled.div`
  font-size: ${SCALE * 1.6}rem;
  line-height: 1.8rem;
  padding: ${SCALE * 12}px ${SCALE * 16}px ${SCALE * 12}px; // Was 42px for bottom.
  user-select: none;

  ${Editable} {
    min-height: 86px;
  }
`;

export const TagLine = styled.div`
  ${flex};
  bottom: 0;
  left: 0;
  padding: 0 ${SCALE * 16}px;
  position: absolute;
  right: 0;
`;

export const Tag = styled.div`${({ color }) => css`
  background-color: ${color || `lightgray`};
  height: ${SCALE * 10}px;
  width: 100%;
  margin: ${SCALE * 8}px ${SCALE * 3}px ${SCALE * 14}px;
`}`;
