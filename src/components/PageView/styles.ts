import styled from 'styled-components';

export const Context = styled.div`
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
`;

export const Editable = styled.div`
  width: 525px;
  max-width: 100%;
  padding-bottom: 100px;
  margin: 0 auto;
  position: relative;

  .fixed {
    top: -16px;
    left: calc(100% + 80px);
    position: absolute;
  }

  .link {
    margin-top: 20px;
    cursor: pointer;

    i {
      transition: all 0.1s ease-in-out;
      color: #d2d2d2;
    }

    &:hover {
      i {
        color: ${props => props.theme.primaryLight};
      }
    }
  }
`;

export const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
`;
