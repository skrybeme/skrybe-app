import { px, Space } from '@/ui/styles/spacing';
import styled, { css } from 'styled-components';

export const Toolbar = styled.div`${({ theme }) => css`
  background-color: ${theme.toolbar.bg};
  height: ${px(Space.XXL)};
  left: 0;
  padding: 0 ${px(Space.M)};
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;
`}`;

export const Flex = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export const Hamburger = styled.button`${({ theme }) => css`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 14px;
  outline: 0;
  position: relative;
  width: 24px;

  > span {
    background-color: ${theme.toolbar.fg};
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    &:nth-child(2) {
      top: 6px;
    }

    &:nth-child(3) {
      top: 12px;
    }
  }
`}`;

export const LogoContainer = styled.div`
  height: 24px;
`;

export const ProfilePicture = styled.div`${({ theme }) => css`
  align-items: center;
  background-color: ${theme.profilePicture.bg};
  border-radius: 50%;
  display: flex;
  height: 32px;
  justify-content: center;
  user-select: none;
  width: 32px;

  > span {
    color: ${theme.profilePicture.fg};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-transform: uppercase;
  }
`}`;
