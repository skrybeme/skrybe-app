import { flex } from '@/ui/styles/mixins';
import styled from 'styled-components';

export const LevelContext = styled.div`
  ${flex};
  align-items: baseline;
`;

export const GenericCardTeaserTree_VariantA = styled.div`
  ${flex};
  flex-direction: column;
  justify-content: baseline;
  padding-top: 69px;
  position: relative;

  ${LevelContext} {
    margin-top: 50px;
  }

  ${LevelContext} & {
    padding-top: 0;
  }
`;
