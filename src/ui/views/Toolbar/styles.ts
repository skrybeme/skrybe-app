import styled from 'styled-components';

export const Toolbar = styled.div<any>`
  background-color: #3A2C61;
  color: ${props => props.theme.light};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 74px;
  padding: 0 20px 0 30px;
  z-index: 599;

  ${props => props.flex !== null && `
    display: flex;
    align-content: center;
    justify-content: space-between;
  `}
`;

export const Flex = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  z-index: 1;
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

export const HomeIcon = styled.div`
  padding: 8px 8px 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    height: auto;
    font-size: 28px;
  }
`;

export const Logo = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;

  img {
    max-height: 38px;
  }
`;

export const Bullet = styled.div`
  background-color: ${props => props.theme.primaryContrast};
  color: ${props => props.theme.primaryLight};
  font-size: 15px;
  width: 30px;
  height: 30px;
  margin: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
