import styled from 'styled-components';

export const Context = styled.div`
  background-color: ${props => props.theme.bgLight};
  color: ${props => props.theme.defaultLight};
  padding: 185px 25% 0;
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

export const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
`;
