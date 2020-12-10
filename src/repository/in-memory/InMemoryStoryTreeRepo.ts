import { AsyncMaybe, UuidType } from '@/common/types';
import { IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default function createInMemoryStoryTreeRepo(
  treeCollection: Tree<StoryCard>[] = []
): IStoryTreeRepo {
  const _treeCollection = treeCollection;

  return {
    getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
      const result = _treeCollection.find((tree) => tree.id === id);
  
      return Promise.resolve(result || null);
    },
    getCollection(): Promise<Tree<StoryCard>[]> {
      return Promise.resolve(_treeCollection);
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      const index = _treeCollection.findIndex((t) => t.equals(tree));
  
      if (index < 0) {
        _treeCollection.push(tree);
      } else {
        _treeCollection.splice(index, 1, tree);
      }
  
      return Promise.resolve(tree);
    }
  }
}
