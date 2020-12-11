import React from 'react';
import {
  GenericCardTeaserTree_VariantA
} from '@/ui/domain-components/GenericCardTeaserTree';
import { useDraggable } from '@/ui/hooks';
import { useTreeDetails } from '@/ui/presenters';
import * as S from './styles';
import * as GS from '@/ui/styles/global';

export function TreeDetails(): JSX.Element {
  const dragHandleRef = useDraggable<HTMLDivElement>();

  const {
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    root
  } = useTreeDetails();

  return (
    <GS.Unscrollable>
      <S.TreeDetails ref={dragHandleRef}>
        <GenericCardTeaserTree_VariantA
          generateChildrenTreeNodes={generateChildrenTreeNodes}
          insertTreeNode={insertTreeNode}
          removeTreeNode={removeTreeNode}
          root={root.data}
        />
      </S.TreeDetails>
    </GS.Unscrollable>
  );
}
