import { EditableProps } from '@/interfaces/props';
import styled, { css } from 'styled-components';

export const Editable = styled.div<Partial<EditableProps>>`
  // @FIXME
  // This is not very clever, but still does the job. The flex property is defined here in
  // order for the component to display on full height of CardTeaser.
  flex: 1;
  outline: 0;

  &:before {
    color: #ccc;
    pointer-events: none;
  }

  &:empty {
    &:before {
      content: "${props => props.placeholder}";
    }
  }

  ${(props) => props.isDisabled && css`
    user-select: none;
  `};
`;
