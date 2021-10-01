import { positionCover, positionCoverBefore } from '@/ui/styles/mixins';
import styled, { keyframes } from 'styled-components';

export const FormSignToESL = styled.form`
  margin-top: 32px;
  position: relative;
`;

export const EmailInput = styled.input`
  background: transparent;
  color: #fff;
  font-size: 16px;
  border: 1px solid #444;
  padding: 4px 8px;
  line-height: 24px;
  width: 100%;
  outline: 1px;
  outline-color: #fff;

  &:focus {
    border-color: #fff;
  }

  &.has-error {
    border-color: #f44336;
  }
`;

export const ActionButtons = styled.div`
  margin-top: 24px;

  > * + * {
    margin-left: 32px;
  }
`;

export const Button = styled.button`
  ${positionCoverBefore(-12)};

  background-color: transparent;
  border: 0;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding: 0;
  z-index: 1;

  &.primary {
    color: rgb(255, 193, 92);
  }

  &:before {
    background-color: #333;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.05s ease-in-out;
    z-index: -1;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`;

export const Error = styled.div`
  bottom: 100%;
  color: #f44336;
  font-size: 14px;
  padding-bottom: 2px;
  position: absolute;
`;

export const spin = keyframes`
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(270deg);
  }

  50% {
    transform: rotate(540deg);
  }

  75% {
    transform: rotate(810deg);
  }

  100% {
    transform: rotate(1080deg);
  }
`;

export const Loader = styled.div`
  ${positionCover()};
  ${positionCoverBefore(-12)};

  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1;

  &:before {
    background-color: #222;
    opacity: 0.6;
    z-index: -1;
  }
`;

export const Spinner = styled.div`
  animation: ${spin} 3s linear infinite;
  border: 4px solid rgb(255, 193, 92);
  border-left-color: transparent;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  position: relative;
  width: 32px;
  z-index: 1;

  &:before {
    animation: ${spin} 3s infinite;
    border: 4px solid rgb(255, 193, 92, 0.61);
    border-left-color: transparent;
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    bottom: -4px;
    box-sizing: content-box;
    content: '';
    left: -4px;
    position: absolute;
    right: -4px;
    top: -4px;
  }
`;
