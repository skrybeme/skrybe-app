import { useCallback, useEffect } from 'react';
import { IStoryTreeUseCases } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';
import { StoryTreeMap } from '@/mappers';
import { TreeNodePresenter } from '@/interfaces/presenters';
import { StoryTreeViewModel } from '@/interfaces/view-models';

// This is temporary.
// It is going to change along with listenForTreeDetails use case implementation.
const fetch = (get, set) => {
  return get({ id: 'c0773e64-3a3a-11eb-adc1-0242ac120002' })
    .then(result => {
      set({
        data: result ? StoryTreeMap.toViewModel(result) : null,
        isLoading: false
      });
    })
    .catch(() => {
      set({
        isError: true,
        isLoading: false
      });
    });
}

export default function useTreeDetails(): TreeNodePresenter {
  const [tree, setTree] = useLoadable<StoryTreeViewModel>({ isLoading: true });

  const {
    generateChildrenTreeNodes,
    getTreeById,
    insertTreeNode,
    removeTreeNode,
    updateTreeNode
  } = useContainer<IStoryTreeUseCases>(SYMBOL.TreeUseCases);

  useEffect(() => {
    fetch(getTreeById, setTree);
  }, []);

  return {
    generateChildrenTreeNodes: useCallback(
      (nodeId: string, placeBeforeNodeId?: string) => {
        generateChildrenTreeNodes({
          parentNodeId: nodeId,
          placeBeforeNodeId,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        })
          .then(() => {
            getTreeById?.({ id: 'c0773e64-3a3a-11eb-adc1-0242ac120002' })
            .then(result => {
              setTree({
                data: result ? StoryTreeMap.toViewModel(result) : null,
                isLoading: false
              });
            })
            .catch(() => {
              setTree({
                isError: true,
                isLoading: false
              });
            });
          });
      },
      [generateChildrenTreeNodes]
    ),
    insertTreeNode: useCallback(
      (parentNodeId: string, placeBeforeNodeId?: string): void => {
        insertTreeNode({
          body: '',
          header: '',
          parentNodeId,
          placeBeforeNodeId,
          tags: [],
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        })
          .then(fetch(getTreeById, setTree));
      },
      [insertTreeNode, tree]
    ),
    root: tree,
    removeTreeNode: useCallback((nodeId: string) => {
      removeTreeNode({
        id: nodeId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      })
        .then(fetch(getTreeById, setTree));
    }, [removeTreeNode]),
    updateTreeNode: useCallback((nodeId: string, { header }: any) => {
      updateTreeNode({
        header,
        id: nodeId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002',
      })
        .then(fetch(getTreeById, setTree));
    }, [updateTreeNode])
  };
}
