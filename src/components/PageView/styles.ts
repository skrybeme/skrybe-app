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
      padding-bottom: 100px;
    }
  }
`;

export const Panel = styled.div`
  padding: 10px 20px;
  font-size: 15px;
`;
