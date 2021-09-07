import React from 'react';
import { IUseCases } from '@/interfaces';
import { TreeDetailsPresenterResult } from '@/interfaces/presenters';
import { useContainer } from '@/ui/hooks';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import * as SYMBOL from '@/container/symbols';

export interface TreeDetailsPresenterProps {
  storyTreeInfoId: string;
}

// @TODO CRITICAL
// What if story tree root is not resolved?
export function useTreeDetailsPresenter({
  storyTreeInfoId
}: TreeDetailsPresenterProps): TreeDetailsPresenterResult {
  const {
    generateChildrenTreeNodes,
    getTree,
    insertTreeNode,
    removeTreeNode,
    updateCardDetails
  } = useContainer<IUseCases>(SYMBOL.UseCases);

  const storyTreeRootDetailsStore
    = useContainer<StoryTreeRootDetailsStore>(SYMBOL.store.StoryTreeRootDetailsStore);

  return {
    generateChildrenTreeNodes: React.useCallback(
      (source: 'body' | 'header', nodeId: string, placeBeforeNodeId?: string) => {
        generateChildrenTreeNodes.execute({
          parentNodeId: nodeId,
          placeBeforeNodeId,
          source,
          treeId: storyTreeRootDetailsStore.data?.treeRootId || ''
        });
      },
      [generateChildrenTreeNodes, storyTreeRootDetailsStore.data?.treeRootId]
    ),
    insertTreeNode: React.useCallback(
      (
        parentNodeId: string,
        place?: {
          afterOrBefore: 'after' | 'before',
          nodeId: string
        }
      ): void => {
        insertTreeNode.execute({
          body: '',
          header: '',
          parentNodeId,
          place,
          tags: [],
          treeId: storyTreeRootDetailsStore.data?.treeRootId || ''
        });
      },
      [insertTreeNode, storyTreeRootDetailsStore.data?.treeRootId]
    ),
    root: storyTreeRootDetailsStore,
    removeTreeNode: React.useCallback((nodeId: string) => {
      removeTreeNode.execute({
        id: nodeId,
        treeId: storyTreeRootDetailsStore.data?.treeRootId || ''
      });
    }, [removeTreeNode, storyTreeRootDetailsStore.data?.treeRootId]),
    treeId: storyTreeRootDetailsStore.data?.treeRootId || '',
    triggerGetTree: React.useCallback(() => {
      getTree.execute({ storyTreeInfoId });
    }, [getTree, storyTreeInfoId]),
    updateTreeNode: React.useCallback((nodeId: string, { header, tags }: any) => {
      updateCardDetails.execute({
        header,
        id: nodeId,
        tags,
        treeId: storyTreeRootDetailsStore.data?.treeRootId || ''
      });
    }, [storyTreeRootDetailsStore.data?.treeRootId, updateCardDetails])
  };
}
