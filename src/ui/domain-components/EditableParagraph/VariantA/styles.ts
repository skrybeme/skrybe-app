import { positionCoverAfter, positionCoverBefore } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const EditableParagraph = styled.div`
  position: relative;
`;

export const Header = styled.div`
  align-items: center;
  background-color: #E05757;
  border-radius: 3px 3px 0 0;
  bottom: calc(100% + 8px);
  color: #fff;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  line-height: 32px;
  left: 0;
  margin: 0 -${px(Space.M + Space.S)};
  padding: 0 ${px(Space.M + Space.S)};
  position: absolute;
  right: 0;
  z-index: 2;
`;

export const Headline = styled.div`
  margin-right: ${px(Space.L)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  > * {
    &:first-child {
      font-weight: 500;
      margin-right: ${px(Space.S)};
    }
  }
`;

export const EditableContainer = styled.div<any>`${({ isEditState }) => css`
  ${positionCoverBefore(-24, -16)};
  ${positionCoverAfter(-16, -8)};

  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  z-index: 1;

  &:after {
    background-color: #fff;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.05s ease-in-out;
    z-index: -1;
  }

  &:before {
    background-color: #E05757;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  ${isEditState && css`
    &:before,
    &:after {
      opacity: 1;
    }
  `};
`}`;
