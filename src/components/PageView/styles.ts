import styled from 'styled-components';

export const Wrapper = styled.div`
  transition: all 0.1s ease-in-out;
  max-width: 1280px;
  width: 100%;
  opacity: 0;
`;

export const Context = styled.div<any>`
  background-color: ${props => props.theme.bgLight};
  color: ${props => props.theme.defaultLight};
  padding: 185px 0 0;
  height: 100%;
  font-size: 17px;
  display: flex;
  justify-content: center;

  .fs-32 {
    font-size: 32px;
    margin-bottom: 50px;
  }

  .muted {
    color: ${props => props.theme.muted};
    font-size: 17px;
    margin-bottom: 12px;
  }

  p {
    line-height: 2.4rem;
    font-size: 17px;
  }

  ${props => props.isReady && `
    ${Wrapper} {
      opacity: 1;
    }
  `}
`;

export const Editable = styled.div`
  width: 525px;
  max-width: 100%;
  padding-bottom: 100px;
  margin: 0 auto;
  position: relative;

  .fixed {
    top: -16px;
    position: absolute;

    &-left {
      right: calc(100% + 70px);
    }

    &-right {
      left: calc(100% + 70px);
    }
  }

  .link {
    padding: 10px 20px;
    cursor: pointer;

    &-title {
      color: ${props => props.theme.muted};
      transform: translateX(10px);
      transition: transform 0s linear 0.1s, opacity 0.1s ease-in-out 0s;
      margin-left: 20px;
      opacity: 0;
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
      transition: all 0.1s ease-in-out;
      color: #d2d2d2;
    }

    &:hover {
      .link-title {
        transition: all 0.1s ease-in-out 0s;
        transform: none;
        opacity: 1;
      }

      i {
        color: ${props => props.theme.primaryLight};
      }
    }
  }
`;
