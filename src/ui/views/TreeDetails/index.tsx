import React from 'react';
import {
  GenericCardTeaserTree_VariantA
} from '@/ui/components/GenericCardTeaserTree';
import { useDraggable } from '@/ui/hooks';
import { useTreeDetails } from '@/ui/presenters';
import * as S from './styles';

export default function TreeDetails(): JSX.Element {
  const { nodes } = useTreeDetails();
  const dragHandleRef = useDraggable();

  return (
    <S.TreeDetails ref={dragHandleRef}>
      <GenericCardTeaserTree_VariantA nodes={nodes.data} />
    </S.TreeDetails>
  );
}
