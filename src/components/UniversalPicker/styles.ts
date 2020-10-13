import styled from 'styled-components';
import { noSelect } from '@/styles/mixins';

export const Picker = styled.div`
  transition: all 0.1s ease-in-out;
  padding: 8px 24px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.primary};
  }
`;

export const Caption = styled.div`
  font-size: 1.3rem;
`;

export const Title = styled.div`
  padding-top: 2px;
  font-size: 2.5rem;

  i {
    margin-left: 10px;
  }
`;

export const List = styled.div`
  min-width: 100%;
  box-shadow: 1px 1px 3px ${props => props.theme.shadow};
  position: absolute;
`;

export const Item = styled.div`
  transition: all 0.1s ease-in-out;
  background-color: ${props => props.theme.bgLight};
  padding: 12px 24px;
  cursor: pointer;

  & + & {
    border-top: 1px solid ${props => props.theme.bg};
  }

  &:hover {
    background-color: ${props => props.theme.bgLightHover};
  }

  .head {
    color: ${props => props.theme.default};
    font-size: 2rem;
    white-space: nowrap;
  }

  .caption {
    color: ${props => props.theme.muted};
    font-size: 1.6rem;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
  }

  .head + .caption {
    margin-top: 13px;
  }

  .center {
    padding: 8px 16px;
    text-align: center;
  }
`;

export const Context = styled.div<any>`
  height: 100%;
  position: relative;
  ${noSelect}

  ${List} {
    transform: scale(0.9);
    transition: all 0.1s ease-in-out;
    opacity: 0;
    pointer-events: none;
  }

  ${props => props.isOpen && `
    ${Picker} {
      background-color: ${props.theme.primary};
    }

    ${List} {
      transform: none;
      opacity: 1;
      pointer-events: all;
    }
  `}
`;
