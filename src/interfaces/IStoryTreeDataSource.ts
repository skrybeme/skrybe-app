import { AsyncMaybe, UuidType } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import IPersistable from './IPersistable';

export interface StoryTreeDataSourceQuery {
  storyTreeInfoId: UuidType;
}

export default interface IStoryTreeDataSource extends IPersistable<Tree<StoryCard>> {
  getById(id: UuidType): AsyncMaybe<Tree<StoryCard>>;
  getCollection(): Promise<Tree<StoryCard>[]>;
  getOneBy(query: StoryTreeDataSourceQuery): AsyncMaybe<Tree<StoryCard>>;
  save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>>;
}
