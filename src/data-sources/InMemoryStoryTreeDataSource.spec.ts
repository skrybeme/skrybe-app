import createCommonPersistableSpec from '../common/specs/persistable';
import StoryCard from '../entities/StoryCard';
import Tree from '../entities/Tree';
import { IStoryTreeRepo } from '../interfaces';
import createInMemoryStoryTreeDataSource from './InMemoryStoryTreeDataSource';

describe(`InMemoryStoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => createInMemoryStoryTreeDataSource(collection),
    () => new Tree<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(new StoryCard());
      
      return entity;
    }
  );
});
