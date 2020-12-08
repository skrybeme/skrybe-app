import createStoryTreeUseCases from './story-tree-use-cases';
import StoryCard from '../entities/StoryCard';
import Tree from '../entities/Tree';
import { InMemoryStoryTreeRepo } from '../repository';

describe(`StoryTreeUseCases`, () => {
  const tree = Tree.create<StoryCard>();

  const inMemoryStoryTreeRepo = new InMemoryStoryTreeRepo([tree]);

  const storyTreeUseCases = createStoryTreeUseCases(inMemoryStoryTreeRepo);

  describe(`getTreeById`, () => {
    const { getTreeById } = storyTreeUseCases;

    it(`resolves with null if the tree with given id does not exist in the repo`, async () => {
      const entry = await getTreeById('invalid-uuid');

      expect(entry).toBeNull();
    });

    it(`resolves with story tree domain model if it exists in the repo`, async () => {
      const entry = await getTreeById(tree.id);

      expect(entry).toEqual(tree);
    });
  });
});
