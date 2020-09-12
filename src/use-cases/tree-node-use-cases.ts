import { ITreeNode, ITreeNodeRepo, ITreeNodeUseCases } from '@/interfaces';

export default function createTreeNodeUseCases(
  treeNodeRepo: ITreeNodeRepo
): ITreeNodeUseCases {
  return {
    rebindTreeNode(node: ITreeNode, parent: ITreeNode, position: number): ITreeNode {
      treeNodeRepo.remove(node);
      return treeNodeRepo.add(node, parent, position);
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
