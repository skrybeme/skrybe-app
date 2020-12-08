import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { AsyncMaybe, UuidType } from '@/common/types';
import { IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';

export default function createStoryTreeUseCases(
  treeRepo: IStoryTreeRepo
): IStoryTreeUseCases<Tree<StoryCard>, StoryCard> {
  return {
    getTreeById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
      return treeRepo.getById(id);
    },
    async rebindTreeNode(
      treeId: UuidType,
      nodeId: UuidType,
      parentNodeId: UuidType,
      placeBeforeNodeId: UuidType
    ): Promise<StoryCard> {
      const tree = await this.getTreeById(treeId);

      if (!tree) {
        throw new Error(``);
      }

      const node = tree.getNodeById(nodeId);

      if (!node) {
        throw new Error(``);
      }

      tree.removeById(nodeId);
      
      // The insert method needs to return inserted node object.
      tree.insert(node!, parentNodeId, placeBeforeNodeId);

      await treeRepo.save(tree);
      
      return Promise.resolve(node);
    }
  }
}
