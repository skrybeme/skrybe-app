import { UuidType, AsyncMaybe } from '@/common/types';
import { IStoryTreeDataSource } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default function createInMemoryStoryTreeDataSource(
  collection: Array<Tree<StoryCard>> = []
): IStoryTreeDataSource {
  const _collection = collection;

  return {
    boot(): void {},
    getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
      const result = _collection.find((tree) => tree.id === id);

      return Promise.resolve(result || null);
    },
    getCollection(): Promise<Tree<StoryCard>[]> {
      return Promise.resolve(_collection);
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      const index = _collection.findIndex((t) => t.equals(tree));

      if (index < 0) {
        _collection.push(tree);
      } else {
        _collection.splice(index, 1, tree);
      }

      return Promise.resolve(tree);
    }
  };
}
