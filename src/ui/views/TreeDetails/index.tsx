import React, { ReactElement, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  GenericStoryTree_VariantA as GenericStoryTree
} from '@/ui/domain-components/GenericStoryTree';
import { useContainer, useDraggable } from '@/ui/hooks';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { useTreeDetailsPresenter } from './presenter';
import * as SYMBOL from '@/container/symbols';
import * as S from './styles';
import * as GS from '@/ui/styles/global';

export const TreeDetails = observer((): ReactElement => {
  const dragHandleRef = useDraggable<HTMLDivElement>();

  const {
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    triggerGetTreeById,
    updateTreeNode
  } = useTreeDetailsPresenter();

  const storyTreeRootDetailsStore
    = useContainer<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);

  const root = React.useMemo(
    () => storyTreeRootDetailsStore.data,
    [storyTreeRootDetailsStore.data]
  );

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
          root={root}
          updateTreeNode={updateTreeNode}
        />
      </S.TreeDetails>
    </GS.Unscrollable>
  );
});
