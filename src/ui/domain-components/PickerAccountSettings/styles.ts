import styled from 'styled-components';
import { noSelect } from '@/ui/styles/mixins';

export const Trigger = styled.div<any>`
  transition: all 0.1s ease-in-out;
  height: 100%;
  width: 80px;
  color: ${props => props.theme.primaryLight};
  font-weight: 700;
  line-height: 42px;
  font-size: 21px;
  z-index: 1;
  text-align: center;
  position: relative;
  cursor: pointer;

  ${props => props.flex !== null && `
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  &:hover {
    background-color: ${props => props.theme.primary};
  }

  &:after {
    content: '';
    width: 40px;
    height: 40px;
    left: 20px;
    top: calc(50% - 20px);
    border-radius: 50%;
    z-index: -1;
    background-color: ${props => props.theme.primaryContrast};
    position: absolute;
  }
`;

export const Link = styled.a`
  transition: all 0.1s ease-in-out;
  background-color: ${props => props.theme.bgLight};
  color: ${props => props.theme.default};
  font-size: 1.5rem;
  padding: 10px 40px;
  display: block;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.bgLightHover};
  }
`;

export const Item = styled.div`
  transition: all 0.1s ease-in-out;
  background-color: ${props => props.theme.bgLight};
  color: ${props => props.theme.default};

  & + & {
    border-top: 1px solid ${props => props.theme.bg};
  }
`;

export const PickerAccountSettings = styled.div<any>`
  height: 100%;
  position: relative;
  ${noSelect};

  ${props => props.isOpen && `
    ${Trigger} {
      background-color: ${props.theme.primary};
    }
  `}
`;
