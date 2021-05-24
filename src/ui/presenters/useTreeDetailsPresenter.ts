import { useCallback, useEffect } from 'react';
import { IUseCases } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import { StoryTreeMap } from '@/mappers';
import { TreeDetailsPresenter } from '@/interfaces/presenters';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import { GetTreeByIdUseCase } from '@/use-cases/GetTreeByIdUseCase';
import * as SYMBOL from '@/container/symbols';

// @FIXME
// This is temporary.
// It is going to change along with listenForTreeDetails use case implementation.
const fetch = (get: GetTreeByIdUseCase, set) => {
  return get.execute({ id: 'c0773e64-3a3a-11eb-adc1-0242ac120002' })
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

export default function useTreeDetailsPresenter(): TreeDetailsPresenter {
  const [tree, setTree] = useLoadable<StoryTreeViewModel>({ isLoading: true });

  const {
    generateChildrenTreeNodes,
    getTreeById,
    insertTreeNode,
    removeTreeNode,
    updateTreeNode
  } = useContainer<IUseCases>(SYMBOL.UseCases);

  useEffect(() => {
    fetch(getTreeById, setTree);
  }, []);

  return {
    generateChildrenTreeNodes: useCallback(
      (nodeId: string, placeBeforeNodeId?: string) => {
        generateChildrenTreeNodes.execute({
          parentNodeId: nodeId,
          placeBeforeNodeId,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        })
          .then(() => {
            getTreeById.execute?.({ id: 'c0773e64-3a3a-11eb-adc1-0242ac120002' })
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
        insertTreeNode.execute({
          body: '',
          header: '',
          parentNodeId,
          placeBeforeNodeId,
          tags: [],
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        })
          .then(() => {
            fetch(getTreeById, setTree);
          });
      },
      [insertTreeNode, tree]
    ),
    root: tree,
    removeTreeNode: useCallback((nodeId: string) => {
      removeTreeNode.execute({
        id: nodeId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      })
        .then(() => {
          fetch(getTreeById, setTree);
        });
    }, [removeTreeNode]),
    updateTreeNode: useCallback((nodeId: string, { header }: any) => {
      updateTreeNode.execute({
        header,
        id: nodeId,
        treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002',
      })
        .then(() => {
          fetch(getTreeById, setTree)
        });
    }, [updateTreeNode])
  };
}
