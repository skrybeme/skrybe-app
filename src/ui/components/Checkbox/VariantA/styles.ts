import { px, Space } from '@/ui/styles/spacing';
import styled from 'styled-components';

export const Checkbox = styled.div``;

export const Label = styled.label`
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  padding-left: ${px(Space.M + Space.L)};
  position: relative;
  user-select: none;

  &:before {
    border: 2px solid #e5e5e5;
    border-radius: 3px;
    content: '';
    height: ${px(Space.L)};
    left: 0;
    position: absolute;
    top: -3px;
    width: ${px(Space.L)};
  }

  &:hover {
    &:before {
      border-color: #333;
    }
  }
`;

export const Input = styled.input`
  display: none;

  &:checked + ${Label} {
    &:before {
      background-color: #333;
      border-color: #fff;
      box-shadow: 0px 0px 0px 2px #333;
    }
  }
`;
