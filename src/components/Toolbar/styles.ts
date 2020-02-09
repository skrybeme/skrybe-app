import styled from 'styled-components';

export const Toolbar = styled.div`
  background-color: ${props => props.theme.primaryLight};
  color: ${props => props.theme.light};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 83px;
  padding: 0 30px;
  display: flex;
  align-content: center;
  z-index: 599;

  .right {
    position: absolute;
    top: 21px;
    right: 30px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.bgLight};
    color: ${props => props.theme.primaryLight};
    font-weight: 700;
    line-height: 42px;
    font-size: 21px;
    text-align: center;
    cursor: pointer;
  }
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
