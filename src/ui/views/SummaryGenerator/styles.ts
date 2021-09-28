import { px, Space } from '@/ui/styles/spacing';
import styled from 'styled-components';
import * as GS from '@/ui/styles/global';

export const SummaryGenerator = styled.div`
  background-color: #fff;
  border-radius: 3px;
  padding: ${px(Space.XXXXL)} ${px(Space.XXL)};
  width: 492px;

  ${GS.SimpleLabel} {
    margin-top: ${px(Space.XL)};
  }
`;

export const Topbar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

export const Headline = styled.h2`
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  margin: 0;
  text-transform: uppercase;
`;
