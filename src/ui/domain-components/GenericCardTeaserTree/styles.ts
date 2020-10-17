import { flex } from '@/ui/styles/mixins';
import styled from 'styled-components';
import { CardTeaser } from '@/ui/components/CardTeaser/styles';

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

  ${CardTeaser} {
    margin: 5px 10px;
  }

  ${LevelContext} {
    margin-top: 10px;
  }

  ${LevelContext} & {
    padding-top: 0;
  }
`;
