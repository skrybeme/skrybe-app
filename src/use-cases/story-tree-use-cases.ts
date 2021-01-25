import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { AsyncMaybe } from '@/common/types';
import { IStoryTreeRepo, IStoryTreeUseCases } from '@/interfaces';
import {
  GenerateChildrenTreeNodesRequest,
  GetTreeByIdRequest,
  InsertTreeNodeRequest,
  RebindTreeNodeRequest,
  RemoveTreeNodeRequest,
  UpdateTreeNodeRequest,
} from '@/interfaces/requests';
import Tag from '@/entities/Tag';

export default function createStoryTreeUseCases(
  treeRepo: IStoryTreeRepo
): IStoryTreeUseCases {
  return {
    async generateChildrenTreeNodes(
      request: GenerateChildrenTreeNodesRequest
    ): AsyncMaybe<Array<StoryCard>> {
      const tree = await treeRepo.getById(request.treeId);

      if (!tree) {
        return Promise.resolve(null);
      }

      const parent = await tree.getNodeById(request.parentNodeId);

      if (!parent) {
        return Promise.resolve(null);
      }
      
      const sentences = parent.body.match(/\b((?!=|\?|\.).)+(.)\b/g);

      let cards: Array<StoryCard> = [];

      sentences?.forEach((sentence: string) => {
        sentence = sentence.replace(/\s{2,}/g, ' ').replace(/\.$/, '')

        const card = StoryCard.create({ header: sentence });

        tree!.insert(card, parent?.id, request.placeBeforeNodeId);

        cards.push(card);
      });

      await treeRepo.save(tree);

      return Promise.resolve(cards);
    },
    getTreeById({ id }: GetTreeByIdRequest): AsyncMaybe<Tree<StoryCard>> {
      return treeRepo.getById(id);
    },
    // @TODO
    // This should be tested for a case when parentNodeId is not provided. It means that
    // we want to create the root node and it needs to be validated properly.
    async insertTreeNode(request: InsertTreeNodeRequest): AsyncMaybe<StoryCard> {
      const tree = await treeRepo.getById(request.treeId);

      if (!tree) {
        return Promise.resolve(null);
      }

      const card = StoryCard.create({
        body: request.body,
        header: request.header,
        tags: request.tags.map((tag) => Tag.create({
          color: tag.color,
          label: tag.label
        })),
      });

      // @TODO
      // Insert should return inserted object.
      await tree.insert(card, request.parentNodeId, request.placeBeforeNodeId);

      await treeRepo.save(tree);

      return Promise.resolve(card);
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
    },
    async removeTreeNode(request: RemoveTreeNodeRequest): AsyncMaybe<StoryCard> {
      const tree = await treeRepo.getById(request.treeId);

      if (!tree) {
        return Promise.resolve(null);
      }

      const node = tree.getNodeById(request.id);
      
      if (!node) {
        return Promise.resolve(null);
      }

      // The insert method needs to return inserted node object.
      await tree.removeById(node.id);

      await treeRepo.save(tree);

      return Promise.resolve(node);
    },
    async updateTreeNode(request: UpdateTreeNodeRequest): AsyncMaybe<StoryCard> {
      // @TODO
      // Operations on tree nodes should be handled by TreeNodeRepo.
      // Additionaly, a TreeNode object should have access to the tree.
      const tree = await treeRepo.getById(request.treeId);

      if (!tree) {
        return Promise.resolve(null);
      }

      const node = tree.getNodeById(request.id);
      
      if (!node) {
        return Promise.resolve(null);
      }

      node.header = request.header !== undefined ? request.header : node.header;

      await treeRepo.save(tree);

      return Promise.resolve(node);
    }
  }
}
