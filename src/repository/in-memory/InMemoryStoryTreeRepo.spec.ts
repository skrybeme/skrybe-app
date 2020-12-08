import createCommonPersistableSpec from "../../common/specs/persistable";
import StoryCard from "../../entities/StoryCard";
import Tree from "../../entities/Tree";
import InMemoryStoryTreeRepo from './InMemoryStoryTreeRepo';
import { IStoryTreeRepo } from "../../interfaces";

describe(`InMemoryStoryTreeRepo`, () => {
  createCommonPersistableSpec<IStoryTreeRepo, Tree<StoryCard>>(
    (collection: Tree<StoryCard>[]) => new InMemoryStoryTreeRepo(collection),
    () => Tree.create<StoryCard>(),
    (entity: Tree<StoryCard>) => {
      entity.insert(StoryCard.create());
      
      return entity;
    }
  );
});