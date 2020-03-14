import styled from 'styled-components';
import { flex, positionCover } from '@/styles/mixins';

export const Context = styled.div`
  overflow: hidden;
  ${flex};
  ${positionCover};
`;

export const SubcardsContext = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const CardContext = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  }

  &:last-child {
    &:after {
      left: 0;
      right: 50%;
    }
  }

  &.root {
    &:before,
    &:after {
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
  width: 100%;
  bottom: -48px;
  font-size: 1.6rem;
  opacity: 0.5;
  position: absolute;
  text-align: center;
  cursor: pointer;
  ${flex};

  &:hover {
    opacity: 1;
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

export const Tag = styled.div`
  background-color: ${props => props.color || `lightgray`};
  height: 10px;
  width: 100%;
  margin: 8px 3px 14px;
`;
