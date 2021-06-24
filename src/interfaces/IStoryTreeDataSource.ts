import { AsyncMaybe, UuidType } from '@/common/types';
import IDataSource from './IDataSource';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

export default interface IStoryTreeDataSource extends IDataSource<Tree<StoryCard>> {
  getById(id: UuidType): AsyncMaybe<Tree<StoryCard>>;
  getCollection(): Promise<Tree<StoryCard>[]>;
  save(tree: Tree<StoryCard>): Promise<Tree<StoryCard>>;
}
