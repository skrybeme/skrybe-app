import StoryCard from '@/entities/StoryCard';
import StoryTree from '@/entities/StoryTree';
import Tag from '@/entities/Tag';
import { AsyncMaybe, UuidType } from '@/common/types';
import { ITree, ITreeDataSource } from '@/interfaces';
import { lorem } from 'faker';

export default function createMockTreeDataSource(): ITreeDataSource {
  return {
    fetchTreeById(id: UuidType): AsyncMaybe<ITree> {
      const tree = new StoryTree();

      tree.insert(tree.makeNode(
        new StoryCard(
          lorem.sentence(),
          lorem.sentences(),
          [
            new Tag('grey', lorem.word())
          ]
        )
      ));

      // const node = tree.makeNode(
      //   new StoryCard(
      //     lorem.sentence(),
      //     lorem.sentences(),
      //     generateRandomTags(randomInt(0, 3))
      //   )
      // );

      // tree.insert(node, randomOf<ITreeNode>(nodes));

      // nodes.push(node);

      tree.insert(tree.makeNode(
        new StoryCard(
          lorem.sentence(),
          lorem.sentences(),
          [
            new Tag('black', lorem.word()),
            new Tag('grey', lorem.word())
          ]
        )
      ));

      tree.insert(tree.makeNode(
        new StoryCard(
          lorem.sentence(),
          lorem.sentences(),
          [
            new Tag('black', lorem.word()),
            new Tag('grey', lorem.word())
          ]
        )
      ));

      return Promise.resolve(tree);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      return Promise.resolve(null);
    }
  }
}
