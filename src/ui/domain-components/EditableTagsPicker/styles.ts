import { borderRadius, positionCoverBefore } from '@/ui/styles/mixins';
import { px, Space } from '@/ui/styles/spacing';
import * as PopoverStyles from '@/ui/components/Popover/styles';
import styled, { css } from 'styled-components';

export const EditableTagsPicker = styled.div`
  ${PopoverStyles.Body} {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const ClickableTrigger = styled.div`
  ${positionCoverBefore()};

  align-items: center;
  display: flex;
  height: 32px;
  margin-bottom: ${px(Space.S)};
  padding: 0 ${px(Space.M)};
  z-index: 1;

  ${props => props.onClick && css`
    cursor: pointer;
  `};

  > * + * {
    margin-left: ${px(Space.M)};
  }

  &:before {
    ${borderRadius()};

    background-color: #eee;
    opacity: 0;
    transition: opacity 0.05s ease-in-out;
    z-index: -1;
  }

  &:hover {
    &:before {
      opacity: 1;
      transition: opacity 0.05s ease-in-out;
    }
  }
`;

const Label = css`
  color: #999;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`;

export const DefaultLabel = styled.div`
  ${Label};
`;

export const TaglineLabel = styled.div`
  ${Label};

  text-transform: uppercase;
`;

export const TriggerButton = styled.span`
  font-size: 14px;
  height: 32px;
`;

export const Popover = styled.div`
  ${borderRadius()};

  background-color: #fff;
  padding: ${px(Space.M)};
`;
