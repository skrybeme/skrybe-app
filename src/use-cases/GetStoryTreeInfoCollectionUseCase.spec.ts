import { InMemoryRepo } from '@/repository';
import { GetStoryTreeInfoCollectionUseCase } from './GetStoryTreeInfoCollectionUseCase';
import { lorem } from 'faker';
import { StoryTreeInfoMap } from '@/mappers';
import { StoryTreeInfoCollectionStore } from '@/store/StoryTreeInfoCollectionStore';
import StoryTreeInfo from '@/entities/StoryTreeInfo';

describe(`GetStoryTreeInfoCollectionUseCase`, () => {
  const storyTreeInfoCollection = [
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() }),
    new StoryTreeInfo({ title: lorem.sentence() })
  ];

  const inMemoryStoryTreeInfoRepo = new InMemoryRepo(storyTreeInfoCollection);
  const storyTreeInfoCollectionStore = new StoryTreeInfoCollectionStore();

  const getStoryTreeInfoCollection = new GetStoryTreeInfoCollectionUseCase(
    inMemoryStoryTreeInfoRepo,
    storyTreeInfoCollectionStore
  );

  it(`saves acquired story tree info collection to the store`, async () => {
    await getStoryTreeInfoCollection.execute();

    const expectedValue = storyTreeInfoCollection.map(StoryTreeInfoMap.toViewModel);

    expect(storyTreeInfoCollectionStore.data).toEqual(expectedValue);
  });
});
