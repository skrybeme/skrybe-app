import { positionCoverBefore } from "@/ui/styles/mixins";
import styled, { css } from "styled-components";

export const Sidebar = styled.div`
  ${positionCoverBefore()};

  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  padding: 100px;
  z-index: 2;

  &:before {
    background-color: rgb(0, 0, 0, 0.6);
  }
`;

interface SideProps {
  left?: boolean;
  right?: boolean;
}

export const Side = styled.div<SideProps>`
  background-color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 50vw;

  ${props => props.left && css`left: 0;`};

  ${props => props.right && css`right: 0;`};
`;

export const Scrollable = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const CloseButton = styled.button`${({ theme }) => css`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  position: absolute;
  right: 48px;
  top: 32px;
  width: 32px;

  > span {
    background-color: #333;
    height: 2px;
    left: 0;
    opacity: 0.28;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.05s ease-in-out;

    &:nth-child(1) {
      top: 6px;
      transform: translateY(9px) rotate(45deg);
    }

    &:nth-child(2) {
      top: 12px;
      transform: translateY(3px) rotate(-45deg);
    }
  }

  &:hover {
    > span {
      opacity: 1;
    }
  }
`}`;
