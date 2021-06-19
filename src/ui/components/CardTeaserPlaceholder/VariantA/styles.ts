import { borderRadius } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const CardTeaserPlaceholder_VariantA = styled.div`${({ theme }) => css`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding-left: 0;

  &:after {
    background-color: ${theme.storyTree.edge};
    content: '';
    height: 1px;
    left: -${px(Space.S)};
    position: absolute;
    top: 50%;
    width: ${px(Space.S)};
  }
`}`

export const Button = styled.div`${({ theme }) => css`
  ${borderRadius()};

  align-items: center;
  background-color: ${theme.card.bgPlaceholder};
  display: flex;
  height: ${px(Space.L)};
  justify-content: center;
  padding: 0 ${px(Space.M)};
  width: calc(100% - ${px(Space.M)});

  > * {
    color: ${theme.card.fgPlaceholder};
    font-size: 16px;
    font-weight: 400;
    pointer-events: none;
    user-select: none;
  }

  ${CardTeaserPlaceholder_VariantA}:hover & {
    background-color: ${theme.card.bgPlaceholderHover};

    > * {
      color: ${theme.card.fgPlaceholderHover};;
    }
  }
`}`;
