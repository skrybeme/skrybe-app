import { AsyncMaybe, UuidType } from '@/common/types';
import { IStoryTreeDataSource, IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default function createStoryTreeRepo(
  dataSource: IStoryTreeDataSource
): IStoryTreeRepo {
  return {
    getById(id: UuidType): AsyncMaybe<Tree<StoryCard>> {
      return dataSource.getById(id);
    },
    getCollection(): Promise<Tree<StoryCard>[]> {
      return dataSource.getCollection();
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      return dataSource.save(tree);
    }
  };
}
