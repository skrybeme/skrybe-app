import createCommonPersistableSpec from "../../common/specs/persistable";
import StoryCard from "../../entities/StoryCard";
import Tree from "../../entities/Tree";
import createInMemoryStoryTreeRepo from './InMemoryStoryTreeRepo';
import { IStoryTreeRepo } from "../../interfaces";

describe(`InMemoryStoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => createInMemoryStoryTreeRepo(collection),
    () => new Tree<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(new StoryCard());
      
      return entity;
    }
  );
});
