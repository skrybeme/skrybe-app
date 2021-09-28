import { Button } from '../../Button/VariantB/styles';
import styled from 'styled-components';
import { px, Space } from '@/ui/styles/spacing';

export const SimpleTabs_VariantA = styled.div``;

export const TabButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #bbb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;

  & + & {
    margin-left: ${px(Space.L)};
  }

  &.is-active {
    color: #333;
  }
`;
