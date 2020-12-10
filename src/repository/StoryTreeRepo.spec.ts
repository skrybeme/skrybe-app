import createStoryTreeRepo from './StoryTreeRepo';
import createInMemoryStoryTreeDataSource from '../data-sources/InMemoryStoryTreeDataSource';
import StoryCard from './../entities/StoryCard';
import Tree from './../entities/Tree';
import createCommonPersistableSpec from '../common/specs/persistable';
import { IStoryTreeRepo } from '../interfaces';

describe(`StoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => createStoryTreeRepo(createInMemoryStoryTreeDataSource(collection)),
    () => Tree.create<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(StoryCard.create());
      
      return entity;
    }
  );
});
