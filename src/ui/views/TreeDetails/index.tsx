import React, { ReactElement, useEffect } from 'react';
import {
  GenericCardTeaserTree_VariantA
} from '@/ui/domain-components/GenericCardTeaserTree';
import { useDraggable } from '@/ui/hooks';
import { useTreeDetailsPresenter } from '@/ui/presenters';
import * as S from './styles';
import * as GS from '@/ui/styles/global';

export function TreeDetails(): ReactElement {
  const dragHandleRef = useDraggable<HTMLDivElement>();

  const {
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    root,
    triggerGetTreeById,
    updateTreeNode
  } = useTreeDetailsPresenter();

  useEffect(() => {
    triggerGetTreeById('c0773e64-3a3a-11eb-adc1-0242ac120002');
  }, []);

  return (
    <GS.Unscrollable>
      <S.TreeDetails ref={dragHandleRef}>
        <GenericCardTeaserTree_VariantA
          generateChildrenTreeNodes={generateChildrenTreeNodes}
          insertTreeNode={insertTreeNode}
          removeTreeNode={removeTreeNode}
          root={root.data}
          updateTreeNode={updateTreeNode}
        />
      </S.TreeDetails>
    </GS.Unscrollable>
  );
}
