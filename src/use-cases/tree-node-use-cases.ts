import { AsyncMaybe } from '@/common/types';
import { ITreeNode, ITreeNodeUseCases, ITreeRepo } from '@/interfaces';

export default function createTreeNodeUseCases(
  treeRepo: ITreeRepo
): ITreeNodeUseCases {
  return {
    rebindTreeNode(
      node: ITreeNode,
      parent: ITreeNode,
      position: number
    ): AsyncMaybe<ITreeNode> {
      const tree = node.getTree()

      tree.remove(node);
      
      const newNode = tree.insert(node, parent);
      
      return treeRepo.save(tree).then(() => newNode);
    }
  }
}

// const { rebindTreeNode } = createTreeNodeUseCases(
//   nodeRepo: container.get<IStoryTreeNodeRepo>(SYMBOL.StoryTreeNodeRepo)
// );
// or
// const { rebindTreeNode } = container.get<ITreeNodeUseCases>(SYMBOL.TreeNodeUseCases);
// or
// const { rebindTreeNode } = useContainer<ITreeNodeUseCases>(SYMBOL.TreeNodeUseCases);

// await rebindTreeNode(map(node), map(parent), position);
