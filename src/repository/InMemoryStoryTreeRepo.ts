import { AsyncMaybe } from '@/common/types';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import { IStoryTreeRepo } from '@/interfaces';
import { StoryTreeRepoQuery } from '@/interfaces/IStoryTreeRepo';
import { InMemoryRepo } from '.';

export class InMemoryStoryTreeRepo extends InMemoryRepo<Tree<StoryCard>> implements IStoryTreeRepo {
  getOneBy({ storyTreeInfoId }: StoryTreeRepoQuery): AsyncMaybe<Tree<StoryCard>> {
    const record
      = this._collection.find((tree) => tree.info?.id === storyTreeInfoId) || null;

    return Promise.resolve(record);
  }
}
