import IRepo from './IRepo';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { AsyncMaybe, UuidType } from '@/common/types';

export interface StoryTreeRepoQuery {
  storyTreeInfoId: UuidType;
}

interface IStoryTreeRepo extends IRepo<Tree<StoryCard>> {
  getOneBy: (query: StoryTreeRepoQuery) => AsyncMaybe<Tree<StoryCard>>;
}

export default IStoryTreeRepo;
