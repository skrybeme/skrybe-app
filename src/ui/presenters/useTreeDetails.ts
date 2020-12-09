import { StoryTreeViewModel } from '@/interfaces/view-models';
import { useCallback, useEffect, useMemo } from 'react';
import { ILoadable, ITreeNode, ITreeNodeUseCases, IStoryTreeUseCases, UIStoryTree } from '@/interfaces';
import { useContainer, useLoadable } from '@/ui/hooks';
import * as SYMBOL from '@/container/symbols';
import { StoryTreeMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { TreeNodePresenter } from '@/interfaces/presenters';

export default function useTreeDetails(): TreeNodePresenter {
  const [tree, setTree] = useLoadable<StoryTreeViewModel>({ isLoading: true });

  const { getTreeById } = useContainer<IStoryTreeUseCases<Tree<StoryCard>, StoryCard>>(
    SYMBOL.TreeUseCases
  );
  const {
    insertTreeNode,
    removeTreeNode
  } = useContainer<ITreeNodeUseCases>(SYMBOL.TreeNodeUseCases);

  useEffect(() => {
    getTreeById?.({ id: "c0773e64-3a3a-11eb-adc1-0242ac120002" })
    .then(result => {
      setNodes({
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

  const _ = useCallback(
    (parentNode: UIStoryTree, placeBefore?: UIStoryTree): void => {
      const pn = tree.data?.getRoot()?.id === parentNode.id
        ? tree.data.getRoot()
        : tree.data!.findById(parentNode.id)!;

      const pb = placeBefore
        ? tree.data!.findById(placeBefore!.id)!
        : null;

      insertTreeNode(tree.data!.makeNode(new StoryCard('', '')), pn, pb as ITreeNode | undefined)
        .then((tree) => {
          setTree({
            data: tree as StoryTree,
            isLoading: false
          });
        });
    },
    [insertTreeNode, tree]
  );

  const nodes = useMemo((): ILoadable<any> => {
    if (!tree.data) {
      return {
        data: null,
        isError: false,
        isLoading: true
      }
    }
  
    return {
      data: mapTreeToUIStoryTree(tree.data),
      isError: false,
      isLoading: false
    }
  }, [tree]);

  const removeTreeNodeHandler = useCallback(() => {

  }, [removeTreeNode]);

  return {
    insertTreeNode: _,
    nodes,
    removeTreeNode: removeTreeNodeHandler
  };
}
