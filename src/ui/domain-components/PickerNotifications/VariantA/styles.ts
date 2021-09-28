import { positionCoverBefore } from '@/ui/styles/mixins';
import styled, { css } from 'styled-components';

export const PickerNotifications_VariantA = styled.div``;

export const BellIconTrigger = styled.button<{ isOpen?: boolean }>`
  ${positionCoverBefore()};

  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
  z-index: 1;

  &:before {
    background-color: #222;
    opacity: 0;
    z-index: -1;
  }

  > i {
    color: rgb(167, 149, 207);
    font-size: 24px;
  }

  &:hover {
    > i {
      color: #fff;
    }
  }

  ${props => props.isOpen && css`
    &:before {
      opacity: 1;
    }

    > i {
      color: #fff;
    }
  `};
`;

export const UnreadMessagesIndicator = styled.div`
  background-color: #52FBDE;
  border-radius: 50%;
  height: 8px;
  left: 32px;
  position: absolute;
  top: 32px;
  width: 8px;
`;

export const Message = styled.div`
  background-color: #222;
  font-size: 16px;
  line-height: 22px;
  padding: 24px 24px;
  text-align: left;
  width: 460px;

  p, strong {
    color: #fff;
  }

  p {
    margin-top: 8px;
  }

  strong {
    font-weight: 600;
  }
`;

export const MessageFooter = styled.div`
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
  font-weight: 600;
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
