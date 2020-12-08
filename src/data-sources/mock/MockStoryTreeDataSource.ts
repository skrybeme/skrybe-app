import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { generateRandomTags } from '@/helpers';
import { IStoryTreeDataSource } from '@/interfaces';
import { randomInt, randomOf } from '@/utils';
import { lorem } from 'faker';
import createInMemoryStoryTreeDataSource from '../InMemoryStoryTreeDataSource';

export default function createMockTreeDataSource(): IStoryTreeDataSource {
  const tree = Tree.create<StoryCard>();
  const nodes: Array<StoryCard> = [];

  for (let i = 0; i <= randomInt(10, 20); i++) {
    const card = StoryCard.create(
      {
        header: lorem.sentence(),
        body: lorem.sentences(),
        tags: generateRandomTags(randomInt(0, 3))
      }
    );
  
    if (nodes.length > 0) {
      tree.insert(card, randomOf<StoryCard>(nodes).id);
    } else {
      tree.insert(card);
    }
  
    nodes.push(card);
  }

  return createInMemoryStoryTreeDataSource([tree]);
}
