import {
  borderCircle,
  positionCoverAfter,
  positionCoverBefore
} from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const SelectableStoryTree = styled.div``;

export const CardContext = styled.div`
  > ${SelectableStoryTree} {
    margin-left: 24px;
  }
`;

export const CardLabel = styled.div<{ isSelected?: boolean }>`
  ${positionCoverBefore()};
  ${positionCoverAfter()};

  color: #d2d2d2;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  overflow: hidden;
  padding-bottom: ${px(Space.XS)};
  padding-left: ${px(Space.L)};
  padding-top: ${px(Space.XS)};
  text-overflow: ellipsis;
  transition: color 0.05s ease-in-out;
  user-select: none;
  white-space: nowrap;

  &:before,
  &:after {
    ${borderCircle()};

    bottom: auto;
    height: ${px(Space.M)};
    right: auto;
    top: ${px(Space.XS)};
    width: ${px(Space.M)};
  }

  &:before {
    border: 2px solid #d2d2d2;
    transition: border-color 0.05s ease-in-out;
  }

  &:after {
    background-color: #d2d2d2;
    opacity: 0;
    transition: background-color 0.05s ease-in-out;
  }

  &:hover {
    color: #333;
    
    &:before {
      border-color: #333;
    }

    &:after {
      background-color: #333;
    }
  }

  ${(props) => props.isSelected && css`
    color: #333;
    
    &:before {
      border-color: #333;
      opacity: 0;
    }

    &:after {
      background-color: #333;
      opacity: 1;
    }
  `};
`;
