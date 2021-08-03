import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #3A2C61;
  bottom: 0;
  left: 0;
  position: fixed;
  top: 0;
  transform: translateX(-100%);
  transition: transform 0.1s ease-in-out;
  width: 292px;

  &.is-open {
    transform: none;
    transition: transform 0.15s ease-in-out;
  }
`;

export const Container = styled.div`
  padding-top: 64px;
`;

export const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const GroupHeader = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  padding: 0 24px;
`;

export const AddIcon = styled.span`
  cursor: pointer;
  height: 16px;;
  margin-right: 24px;
  position: relative;
  width: 16px;

  &:before,
  &:after {
    background-color: #fff;
    content: '';
    position: absolute;
  }

  &:before {
    bottom: 0;
    left: 8px;
    top: 0;
    width: 1px;
  }

  &:after {
    height: 1px;
    left: 0;
    right: 0;
    top: 8px;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding-bottom: 48px;
  padding-top: 16px;
`;

export const ListItem = styled.li``;

export const ItemText = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

export const ItemLink = styled.a`
  cursor: pointer;
  display: block;
  padding: 8px 32px;

  &:hover:not(.is-active) {
    background-color: #4D3C7C;
  }

  &.is-active {
    background-color: #8F7AC6;

    > ${ItemText} {
      font-weight: 700;
    }
  }
`;
