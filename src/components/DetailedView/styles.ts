import styled from 'styled-components';
import { positionCover } from '@/styles/mixins';

export const Context = styled.div`
  overflow: hidden;
  ${positionCover}
`;

export const Wrapper = styled.div`
  margin: 0 -1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${positionCover}
`;

export const Card = styled.div<any>`
  background-color: ${props => props.theme.bgLight};
  width: 755px;
  height: 572px;
  margin: 0 20px;
  padding: 50px 50px 50px 50px;

  ${props => props.isMuted && `
    opacity: 0.4;
    top: 30px;
    position: relative;
  `};

  header {
    font-size: 3.2rem;
    margin-bottom: 36px;
  }

  p {
    font-size: 2rem;
    line-height: 2.9rem;
  }
`;
