import { AsyncMaybe, UuidType } from '@/common/types';
import { IStoryTreeDataSource, IStoryTreeRepo } from '@/interfaces';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { StoryTreeRepoQuery } from '@/interfaces/IStoryTreeRepo';

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
    getOneBy(query: StoryTreeRepoQuery): AsyncMaybe<Tree<StoryCard>> {
      return dataSource.getOneBy(query);
    },
    save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>> {
      return dataSource.save(tree);
    }
  };
}
