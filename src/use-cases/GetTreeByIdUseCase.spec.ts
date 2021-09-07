import { InMemoryRepo } from '@/repository';
import { GetTreeByIdUseCase } from './GetTreeByIdUseCase';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { StoryTreeMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

describe(`GetTreeByIdUseCase`, () => {
  const tree = new Tree<StoryCard>();

  const inMemoryStoryTreeRepo = new InMemoryRepo([tree]);
  const storyTreeRootDetailsStore = new StoryTreeRootDetailsStore();

  const getTreeById = new GetTreeByIdUseCase(inMemoryStoryTreeRepo, storyTreeRootDetailsStore);

  it(
    `saves null to the store if the tree with given id does not exist in the repo`,
    async () => {
      await getTreeById.execute({ id: 'invalid-uuid' });

      expect(storyTreeRootDetailsStore.data).toBeNull();
    }
  );

  it(`saves story tree to the store if it exists in the repo`, async () => {
    await getTreeById.execute({ id: tree.id });

    expect(storyTreeRootDetailsStore.data).toEqual(StoryTreeMap.toViewModel(tree));
  });
});
