import styled from 'styled-components';

export const Toolbar = styled.div<any>`
  background-color: ${props => props.theme.primaryLight};
  color: ${props => props.theme.light};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 83px;
  padding: 0 30px;
  z-index: 599;

  ${props => props.flex !== null && `
    display: flex;
    align-content: center;
    justify-content: space-between;
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const Hamburger = styled.div`
  padding: 8px 30px 8px 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: relative;
    width: 24px;
    height: 24px;

    > span {
      background-color: ${props => props.theme.light};
      position: absolute;
      width: 24px;
      height: 2px;
      left: 0;
      top: 5px;

      &:nth-child(2) {
        top: 11px;
      }

      &:nth-child(3) {
        top: 17px;
      }
    }
  }
`;

export const Logo = styled.div`
  padding: 8px 8px 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;

  > span {
    height: auto;
    font-size: 28px;
  }
`;
