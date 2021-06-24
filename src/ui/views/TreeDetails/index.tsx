import React, { ReactElement, useEffect } from 'react';
import { useTreeDetailsPresenter } from '@/ui/presenters';
import {
  GenericStoryTree_VariantA as GenericStoryTree
} from '@/ui/domain-components/GenericStoryTree';
import { useDraggable } from '@/ui/hooks';
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
        <GenericStoryTree
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
