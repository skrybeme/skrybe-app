import { describeCommonStoreSpec } from './common-store-spec';
import { StoryTreeRootDetailsStore } from './StoryTreeRootDetailsStore';
import { reaction } from 'mobx';
import { StoryTreeMap } from '@/mappers';
import StoryCard from '@/entities/StoryCard';
import Tree from '@/entities/Tree';

describe(`Store: StoryTreeRootDetailsStore`, () => {
  describeCommonStoreSpec(StoryTreeRootDetailsStore);

  it(`returns domain model transformed to view model`, () => {
    const store = new StoryTreeRootDetailsStore();

    const tree = new Tree<StoryCard>();

    tree.insert(new StoryCard());
    tree.insert(new StoryCard());
    tree.insert(new StoryCard());

    reaction(
      () => store.data && store.data.children.length,
      () => {
        expect(store.data).toEqual(StoryTreeMap.toViewModel(tree));
      }
    )

    store.set({ data: tree });
  });
});
