import { Editable } from '@/ui/components/Editable/styles';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';
import {
  PickerCardTeaserOptions_VariantB
} from '../../PickerCardTeaserOptions/VariantB/styles';

export const GenericStoryTree_VariantA = styled.div<{ childless?: boolean, optionsOpen?: boolean }>`
  align-items: center;
  display: flex;
  margin: ${props => props.childless ? px(Space.L) : px(Space.XL)} 0;
  position: relative;
  z-index: 1;

  &:before {
    background-color: #A795CF;
    bottom: -${px(Space.XL)};
    content: '';
    position: absolute;
    left: 0;
    top: -${px(Space.XL)};
    width: 1px;
  }

  &:first-child {
    &:before {
      top: 50%;
    }
  }

  &:last-child {
    &:before {
      bottom: 50%;
    }
  }

  ${props => props.optionsOpen && css`
    z-index: 2;
  `};
`;

export const VEdge = styled.div`
  background-color: #A795CF;
  bottom: -16px;
  content: '';
  left: 0;
  opacity: 0;
  position: absolute;
  top: -16px;
  transition: none;
  width: 1px;
`;

export const LevelContext = styled.div`
  position: relative;
  z-index: 0;
`;

export const CardTeaserPlaceholderContext = styled.div<{ move?: boolean }>`
  height: ${px(Space.XL)};
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: none;
  width: 100%;
  z-index: -1;

  &:first-child {
    bottom: 100%;
  }

  ${props => props.move && css`
    height: 100%;
    left: 100%;
    top: 0;
    width: 192px;
  `};
`;

export const CardTeaserContext = styled.div<{ childless?: boolean, hidePlaceholders?: boolean, oneChild?: boolean, optionsOpen?: boolean }>`
  padding-left: ${px(Space.S)};
  padding-right: ${px(Space.S)};
  position: relative;
  z-index: 1;

  &:after,
  &:before {
    background-color: #A795CF;
    content: '';
    height: 1px;
    position: absolute;
    right: 0;
    top: 50%;
    width: ${px(Space.S)};
  }

  &:after {
    display: none;
  }

  &:before {
    display: none;
    left: 0;
    right: auto;
  }

  ${props => props.oneChild && css`
    &:after {
      display: block;
    }
  `};

  > ${PickerCardTeaserOptions_VariantB} {
    margin-left: 16px;
    position: absolute;
    right: 8px;
    top: 12px;
  }

  ${Editable} {
    padding-right: ${px(Space.XXL)};
  }

  ${props => props.optionsOpen && css`
    z-index: 2;
  `}

  & + ${LevelContext} > ${CardTeaserPlaceholderContext} {
    height: 100%;
    width: 192px;
  }

  ${LevelContext} & {
    &:before {
      display: block;
    }
  }

  ${props => !props.hidePlaceholders && css`
    &:hover + ${LevelContext} > ${CardTeaserPlaceholderContext},
    &:hover ${CardTeaserPlaceholderContext} {
      pointer-events: all;
      opacity: 1;
      transition: opacity 0.05s ease-in-out;
    }

    &:hover ${VEdge} {
      opacity: 1;
      transition: opacity 0.05s ease-in-out;
    }
  `};
`;
