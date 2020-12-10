import createCommonPersistableSpec from "../../common/specs/persistable";
import StoryCard from "../../entities/StoryCard";
import Tree from "../../entities/Tree";
import createInMemoryStoryTreeRepo from './InMemoryStoryTreeRepo';
import { IStoryTreeRepo } from "../../interfaces";

describe(`InMemoryStoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => createInMemoryStoryTreeRepo(collection),
    () => Tree.create<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(StoryCard.create());
      
      return entity;
    }
  );
});
