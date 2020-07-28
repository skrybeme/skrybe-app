import styled from 'styled-components';

export const Label = styled.div<any>`
  padding: 10px 20px;
  user-select: none;

  .chevron {
    right: 20px;
    opacity: 0;
    position: absolute;
  }

  .title {
    color: ${props => props.theme.muted};
    margin-left: 20px;
    display: inline-block;
    white-space: nowrap;
  }

  &.mt-10 {
    margin-top: 10px;
  }

  &.mt-48 {
    margin-top: 48px;
  }

  i {
    color: ${props => props.theme.primaryLight};
  }

  &:hover,
  &.is-active {
    .title {
      transform: none;
      opacity: 1;
    }
  
    i {
      color: ${props => props.theme.primaryLight};
    }
  }

  ${props => props.isClickable && `
    cursor: pointer;

    .title {
      transform: translateX(10px);
      opacity: 0;
    }

    i {
      color: #d2d2d2;
    }

    &.is-active {
      .chevron {
        transform: none;
        opacity: 1;
      }
    }
  `}
`;
