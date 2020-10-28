import styled, { css } from 'styled-components';

export const Picker_VariantA = styled.div`
  position: relative;
`;

export const PickerItem = styled.div<any>`
  white-space: nowrap;

  ${props => !props.styleless && css`
    color: #111;
    font-size: 1.5rem;
    padding: 10px 40px;
    text-align: center;
  `}

  &:not(:first-child) {
    border-top: 1px solid #e2e2e2;
  }

  ${props => props.hoverable && css`
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #f6f6f6;
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
    pointer-events: all;
    position: static;
    transform: none;
  `}
`;4
