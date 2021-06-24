import { CardTeaserProps } from '@/interfaces/props';
import { borderRadius } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';
import { Editable } from '../../Editable/styles';

export const CardTeaser_VariantB = styled.div<Partial<CardTeaserProps>>`${({
  theme
}) => css`
  ${borderRadius()};

  background-color: ${theme.card.bg};
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05); */
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.15);
  color: ${theme.card.fg};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  min-height: 56px;
  width: 384px;
  /* width: 256px; */

  &:hover {
    background-color: ${theme.card.bgHover};
  }

  ${Editable} {
    padding: ${px(Space.M)} ${px(Space.M)};
  }
`}`;
