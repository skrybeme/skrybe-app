import React from 'react';
import { IUseCases } from '@/interfaces';
import { TreeDetailsPresenterResult } from '@/interfaces/presenters';
import { useContainer } from '@/ui/hooks';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import * as SYMBOL from '@/container/symbols';

export function useTreeDetailsPresenter(): TreeDetailsPresenterResult {
  const {
    generateChildrenTreeNodes,
    getTreeById,
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
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        });
      },
      [generateChildrenTreeNodes]
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
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        });
      },
      [insertTreeNode]
    ),
    root: storyTreeRootDetailsStore,
    removeTreeNode: React.useCallback((nodeId: string) => {
      removeTreeNode.execute({
        id: nodeId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      });
    }, [removeTreeNode]),
    triggerGetTreeById: React.useCallback((_: string) => {
      getTreeById.execute({ id: 'c0773e64-3a3a-11eb-adc1-0242ac120002' });
    }, [getTreeById]),
    updateTreeNode: React.useCallback((nodeId: string, { header, tags }: any) => {
      updateCardDetails.execute({
        header,
        id: nodeId,
        tags,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002',
      });
    }, [updateCardDetails])
  };
}
