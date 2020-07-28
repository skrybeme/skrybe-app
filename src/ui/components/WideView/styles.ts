import styled from 'styled-components';
import { flex, positionCover } from '@/ui/styles/mixins';

const BallMixin = () => `
  background-color: #fff;
  border: 1px solid #d2d2d2;
  border-radius: 50%;
  font-size: 15px;;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    color: #d2d2d2;
  }
`;

export const Context = styled.div`
  padding-top: 143px;
  ${flex};
  ${positionCover};
  align-items: baseline;
  overflow: hidden;
`;

export const SubcardsContext = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const Ball = styled.div`
  ${BallMixin};
`;

export const HorizontalTentacle = styled.div`
  transition: opacity 0.2s ease-in-out 0.3s;
  opacity: 0;
  display: flex;
  align-items: center;

  > ${Ball} {
    margin-right: 10px;
    position: relative;

    &:before {
      content: '';
      background-color: rgb(204, 204, 204);
      right: 100%;
      left: -10px;
      bottom: 12px;
      height: 2px;
      position: absolute;
    }

    &:after {
      content: '';
      background-color: rgb(204, 204, 204);
      left: -10px;
      bottom: 12px;
      top: -15px;
      width: 2px;
      position: absolute;
    }
  }
`;

export const Tentacle = styled.div`
  ${BallMixin};
  transition: opacity 0.2s ease-in-out 0.3s;
  position: absolute;
  top: 50px;
  z-index: 10000;
  opacity: 0;

  &:before {
    content: '';
    background-color: rgb(204, 204, 204);
    width: 2px;
    top: -70px;
    bottom: 100%;
    position: absolute;
    z-index: -1;
  }

  &:after {
    content: '';
    background-color: rgb(204, 204, 204);
    height: 2px;
    top: -72px;
    left: calc(50% - 1px);
    right: -96px;
    position: absolute;
    display: none;
    z-index: -1;
  }

  &.left {
    left: calc(50% - 125px);
    right: auto;
  }

  &.right {
    right: calc(50% - 125px);
    left: auto;
  }
`;

export const ButtonDelete = styled.div`
  ${BallMixin};
  transition: opacity 0.2s ease-in-out 0.3s;
  top: -10px;
  right: calc(50% - 115px);
  z-index: 10000;
  opacity: 0;
  position: absolute;
`;

export const CardBody = styled.div`
  transition: transform 0.2s ease-out;
  background-color: ${props => props.theme.bgLight};
  width: 200px;
  height: 120px;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.bgLightHover};
  }

  header {
    font-size: 1.6rem;
    padding: 12px 16px;
  }

  footer {
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 13px;
    display: flex;
    position: absolute;
  }
`;

export const CardFooter = styled.div`
  transition: all 0.05s ease-in-out 0s;
  height: 48px;
  width: calc(100% - 20px);
  max-width: 200px;
  bottom: -48px;
  left: 0;
  margin: 5px 10px -50px;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  ${flex};

  &:hover {
    svg {
      path {
        stroke: #aaa;
      }
    }
  }
`;

export const CardContext = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: column;

  ${SubcardsContext} {
    margin-top: 50px;
  }

  &:before,
  &:after {
    content: '';
    background-color: #ccc;
    position: absolute;
  }

  &:before {
    width: 2px;
    height: 25px;
    left: calc(50% - 1px);
    bottom: calc(100% - 5px);
  }

  &:after {
    height: 2px;
    left: 0;
    right: 0;
    bottom: calc(100% + 19px);
  }

  &:first-child {
    &:after {
      left: 50%;
      right: 0;
    }

    ${Tentacle} {
      &.left {
        &:after {
          display: block;
        }
      }
    }
  }

  &:last-child {
    &:after {
      left: 0;
      right: 50%;
    }

    ${Tentacle} {
      &.right {
        &:after {
          left: -96px;
          right: calc(50% - 1px);
          display: block;
        }
      }
    }
  }

  &:hover {
    > ${Tentacle} {
      opacity: 1;
    }

    > ${CardFooter} {
      ${HorizontalTentacle} {
        opacity: 1;
      }
    }

    > ${ButtonDelete} {
      opacity: 1;
    }
  }

  &.root {
    &:before,
    &:after {
      display: none;
    }

    > ${Tentacle} {
      display: none;
    }
  }

  &.only {
    &:before,
    &:after {
      display: none;
    }
  }
`;

export const CardContainer = styled.a`
  transition: all 0.3s ease-in-out;
  margin: 5px 10px;
  z-index: 1;
  position: relative;
  display: block;

  &:hover {
    /* ${CardBody} {
      transform: translateY(-24px);
    }

    ${CardFooter} {
      transition: all 0.2s ease-in-out 0.1s, background-color 0s ease-in-out 0s;
      opacity: 1;
    } */
  }

  &.is-open {
    ${CardBody} {
      header,
      footer {
        opacity: 0;
      }
    }

    ${CardFooter} {
      opacity: 0;
    }
  }
`;

export const DynamicOverlay = styled.div`
  transition: opacity 0.1s, transform 0.2s ease-out;
  background-color: ${props => props.theme.bgLight};
  width: 200px;
  height: 78px;
  opacity: 0;
  z-index: 100000;
  position: fixed;
  pointer-events: none;
`;

export const Tag = styled.div`
  background-color: ${props => props.color || `lightgray`};
  height: 10px;
  width: 100%;
  margin: 8px 3px 14px;
`;
