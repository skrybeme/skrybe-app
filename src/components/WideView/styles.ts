import styled from 'styled-components';
import { flex, positionCover } from '@/styles/mixins';

export const Context = styled.div`
  overflow: hidden;
  ${flex};
  ${positionCover};
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
  background-color: ${props => props.theme.bgLight};
  border-top: 1px solid ${props => props.theme.bg};
  height: 48px;
  width: 100%;
  opacity: 0;
  bottom: -24px;
  font-size: 1.6rem;
  position: absolute;
  text-align: center;
  cursor: pointer;
  ${flex};

  &:hover {
    background-color: ${props => props.theme.bgLightHover};
  }
`;

export const CardContainer = styled.a`
  transition: all 0.3s ease-in-out;
  margin: 5px;
  position: relative;
  display: block;

  &:hover {
    ${CardBody} {
      transform: translateY(-24px);
    }

    ${CardFooter} {
      transition: all 0.2s ease-in-out 0.1s, background-color 0s ease-in-out 0s;
      opacity: 1;
    }
  }

  &.is-open {
    transform: translate(200px, 200px) scale(10);

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
