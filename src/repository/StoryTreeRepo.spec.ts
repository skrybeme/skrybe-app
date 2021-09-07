import createStoryTreeRepo from './StoryTreeRepo';
import createInMemoryStoryTreeDataSource from '../data-sources/InMemoryStoryTreeDataSource';
import StoryCard from './../entities/StoryCard';
import Tree from './../entities/Tree';
import createCommonPersistableSpec from '../common/specs/persistable';
import { IStoryTreeRepo } from '../interfaces';
import { datatype } from 'faker';

describe(`StoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => createStoryTreeRepo(createInMemoryStoryTreeDataSource(collection)),
    () => new Tree<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(new StoryCard());
      
      return entity;
    }
  );

  describe(`getOneBy`, () => {
    it(`executes proper source method and returns its result`, () => {
      const dataSource = createInMemoryStoryTreeDataSource([]);

      dataSource.getOneBy = jest.fn();

      const repo = createStoryTreeRepo(dataSource);

      const storyTreeInfoId = datatype.uuid();

      repo.getOneBy({ storyTreeInfoId });

      expect(dataSource.getOneBy).toBeCalledWith({ storyTreeInfoId });
    })
  });
});
