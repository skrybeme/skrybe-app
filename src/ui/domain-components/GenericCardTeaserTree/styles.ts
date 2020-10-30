import { flex } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';
import { CardTeaser } from '@/ui/components/CardTeaser/styles';
import { Button } from '@/ui/components/Button/styles';

export const CardTeaserContext = styled.div`
  position: relative;
`;

export const CardOptions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
`;

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
  width: 30px;
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
    opacity: 0.4;
    outline: 0;

    &:before {
      bottom: -44px;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: -44px;
    }

    &:hover {
      opacity: 1;
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
