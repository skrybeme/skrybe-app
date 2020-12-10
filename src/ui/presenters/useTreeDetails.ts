import { useCallback, useEffect, useMemo } from 'react';
import { ILoadable, IStoryTreeUseCases } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';
import { StoryTreeMap } from '@/mappers';
import { TreeNodePresenter } from '@/interfaces/presenters';
import { StoryTreeViewModel } from '@/interfaces/view-models';

export default function useTreeDetails(): TreeNodePresenter {
  const [tree, setTree] = useLoadable<StoryTreeViewModel>({ isLoading: true });

  const {
    getTreeById,
    insertTreeNode,
    removeTreeNode
  } = useContainer<IStoryTreeUseCases>(SYMBOL.TreeUseCases);

  useEffect(() => {
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
  }, []);

  return {
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
      [insertTreeNode, tree]
    ),
    nodes: useMemo((): ILoadable<any> => {
      if (!tree.data) {
        return {
          data: null,
          isError: false,
          isLoading: true
        }
      }
    
      return {
        data: tree.data,
        isError: false,
        isLoading: false
      }
    }, [tree]),
    removeTreeNode: useCallback(() => {}, [removeTreeNode])
  };
}
