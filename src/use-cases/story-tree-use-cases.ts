import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { AsyncMaybe } from '@/common/types';
import { IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';
import { GetTreeByIdRequest, RebindTreeNodeRequest } from '@/interfaces/requests';

export default function createStoryTreeUseCases(
  treeRepo: IStoryTreeRepo
): IStoryTreeUseCases<Tree<StoryCard>, StoryCard> {
  return {
    getTreeById({ id }: GetTreeByIdRequest): AsyncMaybe<Tree<StoryCard>> {
      return treeRepo.getById(id);
    },
    async rebindTreeNode({
      treeId,
      nodeId,
      parentNodeId,
      placeBeforeNodeId = undefined
    }: RebindTreeNodeRequest): Promise<StoryCard> {
      const tree = await this.getTreeById({ id: treeId });

      if (!tree) {
        throw new Error(``);
      }

      const node = tree.getNodeById(nodeId);

      if (!node) {
        throw new Error(``);
      }

      tree.removeById(nodeId);
      
      // The insert method needs to return inserted node object.
      tree.insert(node, parentNodeId, placeBeforeNodeId);

      await treeRepo.save(tree);
      
      return Promise.resolve(node);
    }
  }
}
