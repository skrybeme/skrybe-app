import StoryCard from '@/entities/StoryCard';
import StoryTree from '@/entities/StoryTree';
import Tag from '@/entities/Tag';
import { AsyncMaybe, UuidType } from '@/common/types';
import { ITree, ITreeDataSource, ITreeNode } from '@/interfaces';
import { lorem } from 'faker';
import { ColorType } from '@/entities/types';

function randomInt(start: number, end: number): number {
  return Math.round(Math.random() * (end - start)) + start;
}

function randomOf<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}

function generateRandomTags(amount: number): Array<Tag> {
  const labels: Array<ColorType> = ['grey', 'red', 'black'];

  let out: any = [];

  for (let i = 0; i <= amount; i++) {
    out.push(new Tag(randomOf<ColorType>(labels), lorem.word()));
  }

  return out;
}

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
  
        if (node.id !== tree.getRoot()!.id) {
          nodes.push(node);
        }
      }

      return Promise.resolve(tree);
    },
    save(tree: ITree): AsyncMaybe<ITree> {
      return Promise.resolve(null);
    }
  }
}
