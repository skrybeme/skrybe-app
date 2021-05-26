import { useCallback } from 'react';
import { IUseCases } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import { StoryTreeMap } from '@/mappers';
import { TreeDetailsPresenterResult } from '@/interfaces/presenters';
import { StoryTreeViewModel } from '@/interfaces/view-models';
import * as SYMBOL from '@/container/symbols';
import { noop } from '@/utils';

// This is temporary.
// It is going to change along with listenForTreeDetails use case implementation.

export function useTreeDetailsPresenter(): TreeDetailsPresenterResult {
  const [tree, setTree] = useLoadable<StoryTreeViewModel>({ isLoading: false });

  const {
    generateChildrenTreeNodes,
    getTreeById,
    insertTreeNode,
    removeTreeNode,
    updateTreeNode
  } = useContainer<IUseCases>(SYMBOL.UseCases);
  
  const handleUseCase = useCallback(async (cb: () => void) => {
    setTree((state) => ({
      ...state,
      isLoading: true
    }));
    
    cb();
    
    try {
      const result = await getTreeById.execute({
        id: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
      });
    
      setTree({
        data: result ? StoryTreeMap.toViewModel(result) : null,
        isError: false,
        isLoading: false
      });
    } catch {
      setTree({
        isError: true,
        isLoading: false
      });
    }
  }, []);

  return {
    generateChildrenTreeNodes: useCallback(
      async (nodeId: string, placeBeforeNodeId?: string) => {
        handleUseCase(async () => {
          await generateChildrenTreeNodes.execute({
            parentNodeId: nodeId,
            placeBeforeNodeId,
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        });
      },
      []
    ),
    insertTreeNode: useCallback(
      async (parentNodeId: string, placeBeforeNodeId?: string): Promise<void> => {
        handleUseCase(async () => {
          await insertTreeNode.execute({
            body: '',
            header: '',
            parentNodeId,
            placeBeforeNodeId,
            tags: [],
            treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
          });
        });
      },
      []
    ),
    root: tree,
    removeTreeNode: useCallback(async (nodeId: string) => {
      handleUseCase(async () => {
        await removeTreeNode.execute({
          id: nodeId,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002'
        });
      });
    }, []),
    triggerGetTreeById: useCallback(async (_: string) => {
      handleUseCase(noop);
    }, []),
    updateTreeNode: useCallback(async (nodeId: string, { header }: any) => {
      handleUseCase(async () => {
        await updateTreeNode.execute({
          header,
          id: nodeId,
          treeId: 'c0773e64-3a3a-11eb-adc1-0242ac120002',
        });
      });
    }, [getTreeById, updateTreeNode])
  };
}
