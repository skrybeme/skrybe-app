import { flex } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';
import { CardTeaser } from '@/ui/components/CardTeaser/styles';
import { Button } from '@/ui/components/Button/styles';

export const LevelContext = styled.div`
  ${flex};
  align-items: flex-start;
  position: relative;

  > * {
    &:before {
      content: '';
      background-color: lightgray;
      height: 2px;
      position: absolute;
      top: -6px;
    }

    &:first-child {
      &:before {
        left: 50%;
        right: 0;
      }
    }

    &:last-child {
      &:before {
        left: 0;
        right: 50%;
      }
    }

    &:not(:first-child):not(:last-child) {
      &:before {
        left: 0;
        right: 0;
      }
    }
  }
`;

export const GenericCardTeaserTree_VariantA = styled.div`
  ${flex};
  flex-direction: column;
  justify-content: baseline;
  padding-top: 69px;
  position: relative;
  z-index: 1;

  ${CardTeaser} {
    margin: 5px 10px;
  }

  ${LevelContext} {
    margin-top: 10px;
  }

  ${LevelContext} & {
    padding-top: 0;
  }

  &:not(:first-child) {
    &:after {
      background-color: lightgray;
      content: '';
      height: 12px;
      left: calc(50% - 1px);
      position: absolute;
      right: calc(50% - 1px);
      top: -6px;
      z-index: -1;
    }
  }
`;

export const ClickableArea = styled.div<any>`
  ${flex};
  height: 118px;
  position: relative;
  width: 50px;
  z-index: 1;

  &:after {
    border: 1px dashed lightgray;
    bottom: 50%;
    content: '';
    left: calc(50% - 1px);
    position: absolute;
    right: calc(50% - 1px);
    top: -6px;
    z-index: -1;
  }

  ${Button} {
    &:before {
      bottom: -44px;
      content: '';
      left: -44px;
      position: absolute;
      right: -44px;
      top: -44px;
    }
  }

  ${props => props.isOnly && css`
    &:before {
      display: none;
    }

    &:after {
      top: -12px;
    }
  `};
`;
