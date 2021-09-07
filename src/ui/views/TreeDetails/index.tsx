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

export interface TreeDetailsProps {
  storyTreeInfoId: string;
}

export const TreeDetails = observer(({
  storyTreeInfoId
}: TreeDetailsProps): ReactElement<TreeDetailsProps> => {
  const dragHandleRef = useDraggable<HTMLDivElement>();

  const {
    generateChildrenTreeNodes,
    insertTreeNode,
    removeTreeNode,
    root,
    treeId,
    triggerGetTree,
    updateTreeNode
  } = useTreeDetailsPresenter({ storyTreeInfoId });

  const storyTreeRootDetailsStore
    = useContainer<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);

  const root = React.useMemo(
    () => storyTreeRootDetailsStore.data,
    [storyTreeRootDetailsStore.data]
  );

  useEffect(() => {
    triggerGetTree();
    // @TODO Test this dependency
  }, [storyTreeInfoId]);

  return (
    <GS.Unscrollable>
      <S.TreeDetails ref={dragHandleRef}>
        <GenericStoryTree
          generateChildrenTreeNodes={generateChildrenTreeNodes}
          insertTreeNode={insertTreeNode}
          removeTreeNode={removeTreeNode}
          root={root}
          treeId={treeId!}
          updateTreeNode={updateTreeNode}
        />
      </S.TreeDetails>
    </GS.Unscrollable>
  );
});
