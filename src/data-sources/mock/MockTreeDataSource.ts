import StoryCard from '@/entities/StoryCard';
import StoryTree from '@/entities/StoryTree';
import { Maybe, UuidType } from '@/common/types';
import { ITree, ITreeDataSource } from '@/interfaces';

export default function createMockTreeDataSource(): ITreeDataSource {
  return {
    fetchTreeById(id: UuidType): Maybe<ITree> {
      const tree = new StoryTree();
      const node = tree.makeNode(new StoryCard('header', 'body'));

      tree.insert(node);

      return tree;
    }
  }
}
