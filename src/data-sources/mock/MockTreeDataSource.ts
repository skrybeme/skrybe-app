import StoryCard from '@/entities/StoryCard';
import StoryTree from '@/entities/StoryTree';
import { AsyncMaybe, UuidType } from '@/common/types';
import { ITree, ITreeDataSource, ITreeNode } from '@/interfaces';
import { randomInt, randomOf } from '@/utils';
import { generateRandomTags } from '@/helpers';
import { lorem } from 'faker';

export default function createMockTreeDataSource(): ITreeDataSource {
  return {
    fetchTreeById(id: UuidType): AsyncMaybe<ITree> {
      const tree = new StoryTree();
      const nodes: Array<any> = [];

      for (let i = 0; i <= randomInt(10, 20); i++) {
        const node = tree.makeNode(
          new StoryCard(
            lorem.sentence(),
            lorem.sentences(),
            generateRandomTags(randomInt(0, 3))
          )
        );
  
        if (nodes.length > 0) {
          tree.insert(node, randomOf<ITreeNode>(nodes));
        } else {
          tree.insert(node);
        }
  
        nodes.push(node);
      }

      return Promise.resolve(tree);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      return Promise.resolve(null);
    }
  }
}
