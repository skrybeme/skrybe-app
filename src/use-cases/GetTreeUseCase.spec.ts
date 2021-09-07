import { InMemoryStoryTreeRepo } from '@/repository';
import { GetTreeUseCase } from './GetTreeUseCase';
import { StoryTreeRootDetailsStore } from '@/store/StoryTreeRootDetailsStore';
import { StoryTreeMap } from '@/mappers';
import { lorem } from 'faker';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

describe(`GetTreeUseCase`, () => {
  const tree = new Tree<StoryCard>({
    info: new StoryTreeInfo({ title: lorem.sentence() })
  });

  const inMemoryStoryTreeRepo = new InMemoryStoryTreeRepo([tree]);
  const storyTreeRootDetailsStore = new StoryTreeRootDetailsStore();

  const getTree = new GetTreeUseCase(inMemoryStoryTreeRepo, storyTreeRootDetailsStore);

  it(
    `saves null to the store if the tree with given id does not exist in the repo`,
    async () => {
      await getTree.execute({ storyTreeInfoId: 'invalid-uuid' });

      expect(storyTreeRootDetailsStore.data).toBeNull();
    }
  );

  it(`saves story tree to the store if it exists in the repo`, async () => {
    await getTree.execute({ storyTreeInfoId: tree.info!.id });

    expect(storyTreeRootDetailsStore.data).toEqual(StoryTreeMap.toViewModel(tree));
  });
});
