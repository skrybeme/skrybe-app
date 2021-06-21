import { PickerTab } from '@/ui/components/Picker/styles';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const PickerCardTeaserOptions_VariantB = styled.div`
  ${PickerTab} {
    width: 256px;
  }
`;

export const Trigger = styled.button<{ isOpen?: boolean }>`
  background-color: transparent;
  border: 0;
  color: lightgray;
  cursor: pointer;
  font-size: 15px;
  height: ${px(Space.XL)};
  outline: 0;
  transition: none;
  width: ${px(Space.XL)};

  ${props => props.isOpen && css`
    background-color: #3A2C61;
    transition: all 0.05s ease-in-out;
  `};

  &:hover {
    background-color: #3A2C61;
    transition: all 0.05s ease-in-out;
  }
`;
