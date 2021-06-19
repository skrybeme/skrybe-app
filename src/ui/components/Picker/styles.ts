import styled, { css } from 'styled-components';

export const Picker_VariantA = styled.div`
  position: relative;
`;

export const PickerItem = styled.div<any>`
  ${props => !props.styleless && css`
    background-color: #3A2C61;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 400;
    padding: 10px 40px;
    text-align: center;
  `}

  & + & {
    border-top: 1px solid #5E489D;
  }

  ${props => props.hoverable && css`
    cursor: pointer;
    transition: background-color 0.05s ease-in-out;

    &:hover {
      background-color: #221740;
    }
  `}
`;

export const PickerTab = styled.div<any>`
  min-width: 200px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translateX(-100%);

  ${props => props.isActive && css`
    opacity: 1;
    pointer-events: inherit;
    position: static;
    transform: none;
  `}
`;4
